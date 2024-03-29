---
  title: Tiny and Secure Docker images for NodeJS Applications
  path: "/blog/node-docker-images"
  date: "2022-11-15"
  thumbnail: "./tiny-docker.png"

---

I recently wanted to dockerize a NodeJS application of mine, the backend for [piko.space](https://piko.space). I wanted to keep the image as small as possible, utilize layer caching, and minimize security risk. But building images like the [official guide](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/) recommends creates huge (**952 MB** for a tiny application) images and exposes a large security surface by packing a full install of debian.

Snyk published a [blogpost](https://snyk.io/blog/choosing-the-best-node-js-docker-image/) about choosing the right docker images for each use-case while focusing on security. One of their recommendations was using distroless images, which don't include a whole operating system but may lack some dependencies your app might need.

To combat this issue, I'm using a multi-stage build process, where the first stage uses the full `node:bullseye` container and the second stage pulls the output from the build stage to run it.

I also wanted to minimize dependency install time. For this I'm using [pnpm](https://pnpm.io). It also features a command specifically for docker layer caching, `pnpm fetch`, which uses only the lockfile and ignores irrelevant changes to package.json. This pre-fetches the dependencies into the pnpm cache, so a later full install already has all the dependencies in the file system.

Because PNPM creates symlinks for dependency files, we can't just copy the content of the `node_modules` to the second stage. The content files needs to be bundled into the build output. This can be accomplished by using [esbuild](https://esbuild.github.io), which can directly transpile TypeScript files and is way quicker at it than `tsx`. But esbuild skips type checking. We can run type checking in parallel using `tsc -noEmit` or skip it altogether if you are already using type checking during your development. For this you can use the following command:

```bash
tsc -noEmit && esbuild src/index.ts --bundle --platform=node --target=node16 --outfile=bundle.js
```

The speed should be noticable, espacially in large projects. I included some benchmarks of the [piko.space](https://piko.space) backend codebase:

<code style="color: #000">
<pre># run "esbuild" using the above command, 20 run average</pre>
<pre >Time (<font color="#4E9A06"><b>mean</b></font> ± <font color="#4E9A06">σ</font>):     <font color="#4E9A06"><b>363.7 ms</b></font> ± <font color="#4E9A06">  4.4 ms</font></pre>
<br/>
<pre ># run "tsc -noEmit", 20 runs average</pre>
<pre>Time (<font color="#4E9A06"><b>mean</b></font> ± <font color="#4E9A06">σ</font>):     <font color="#4E9A06"><b> 2.065 s</b></font> ± <font color="#4E9A06"> 0.360 s</font></pre>
<br/>
<pre># run "tsc", 20 runs average</pre>
<pre>Time (<font color="#4E9A06"><b>mean</b></font> ± <font color="#4E9A06">σ</font>):     <font color="#4E9A06"><b> 2.250 s</b></font> ± <font color="#4E9A06"> 0.407 s</font> </pre>
</code>

This example Dockerfile from my project assumes a monorepo setup, where multiple apps are in the `/apps/<app>` folder, and we are only packaging the backend app.

```docker
###########
# Builder #
###########
FROM node:16-bullseye-slim AS build
RUN npm install -g pnpm

# Fetch dependencies
WORKDIR /app
COPY pnpm-lock.yaml ./
RUN pnpm fetch

# Install dependencies into folders
ADD . ./
RUN pnpm install -r --offline

# Build Monorepo
RUN pnpm run -r build

##########
# Runner #
##########
FROM gcr.io/distroless/nodejs:16
COPY --from=build /app/apps/backend/bundle.js /usr/src/app/
WORKDIR /usr/src/app
CMD ["bundle.js"]
```

The `tsconfig.json` configures the build to work with Node 16:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["ESNext"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "commonjs",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "outDir": "dist"
  },
  "include": ["src"]
}
```

This results in a container using only **121 MB** in size, roughly 87% smaller than the recommended image. Using the distroless image as a base has some drawbacks. If your dependencies are using other programming languages, like python, etc., you have to install them yourself. Dependencies like [prisma](https://www.prisma.io/) which compile code on install need to be handled seperately. But you should probably optimize packaging prisma anyway, as most binaries bundled by it won't be needed by your production app anyways, like the prisma file formatter.

All of this allows for faster deploys and drastically reduced build time. This makes publishing a new version in seconds, not minutes, possible, reducing cycle time and minimizing the gap between production and development. I can deploy a fix almost instantly, and get feedback on changes from real devices so quickly that it actually changed my development workflow. Deploying more often meant I could experiment with small changes and undo them without much friction, which makes the development process way more enjoyable, at least for me.

Thanks for reading! If there is anything you would change about this, I'd be [glad to hear about it](https://twitter.com/mlte_).
