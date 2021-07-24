---
  title: The Best Way to Load an Image in 2021
  path: "/blog/perfect-images"
  date: "2021-07-24"
---
import ImgSrcset from './ImgSrcset'; 
import PictureExample from './Picture';

With the right optimizations, you can **save ~80% on every image** you load.<br/>
If you can lower your load time by just 4 seconds, your probability for a **page bounce** will likely **decrease by ~90%**[^1].

This should be reason enough for us to take image loading serious.

What then, are the steps that we can take, in order for us to load the best possible image? To decrease the required image size, we could:

- use a smaller, modern image format if supported, e.g. AVIF
- download the image that is closest to the rendered size in the DOM
- use a fitting image for different display densities
- show a preview while loading the full-size image to improve perceived performance
- let the browser have the final say on which image gets loaded; it could for example load a smaller image when the network is particularly slow, or if the user has a data saver mode enabled

How can we achieve this? The first step is using the correct HTML attributes.

## Using srcset and sizes

The traditional way of using an `<img>` tag clearly won't suffice. So what are the alternatives?

HTML offers us a way to define multiple different versions of an image in a single element: using the `srcset` attribute combined with the `sizes` attribute. In the `srcset` we can define multiple images and tell the browser the width of each, and using `sizes` we can tell the browser the approximate size of the image in the viewport in a CSS like syntax, so the image can start downloading without needing to layout the whole page first.

An `<img>` tag for an image embedded in a blogpost could look like this: 

```html
<img 
  srcset="/imgs/ocean.jpg?width=1120 1120w,
          /imgs/ocean.jpg?width=840  840w,
          /imgs/ocean.jpg?width=560  560w,
          /imgs/ocean.jpg?width=340  340w"
  sizes="(min-width: 610px) 560px,
         calc(100vw - 2.4rem)"
  src="/imgs/ocean.jpg?width=560"
  width="560px"
  height="234px"
  alt="wild ocean with a clear sky"
/>
```

This tells the browser that the image has a size of calc(100vw - 2.4rem), as an image spans the full width minus the padding, and at a window width of 610px, the image has the maximum size of the blogpost container, 560px. We also add the `src` attribute as a fallback for browsers that don't support `srcset`, as well as a width and height, so the browser can reserve space for the image before its loaded, avoiding layout shift. If you want, you can open the inspector and see what size your browser loads the image[^2] at:


<figure>
  <ImgSrcset />
  <figcaption>Image loaded using an img with srcset and sizes
  </figcaption>
</figure>

Alright, unto our next problem: different image formats. How can we give the browser different image formats using this? We can't. At least not directly in the `<img>` tag.

For this we have two options. We can request a jpg from the server, our browser sets an "Accepts" header, in which all supported image formats are listed, and the server responds with the smallest supported format and sets the "Content-Type"  accordingly. This approach relies on the browser setting the correct header and accepting a response in a different format than requested. Also, if the user now saves this file, it will be stored with the wrong extension. But sites like [The Guardian](https://www.theguardian.com/) are using this approach, so it might work great in practice.

## The &lt;picture&gt; tag


The second option is using the `<picture>` tag. It supports multiple `<source>` elements within, each being able to define a different format. You can use it like this:

```html
<picture >
  <source
    type="image/avif"
    srcset="/imgs/ocean.avif?width=1120 1120w,
            /imgs/ocean.avif?width=840  840w,
            /imgs/ocean.avif?width=560  560w,
            /imgs/ocean.avif?width=340  340w"
    sizes="(min-width: 610px) 560px,
           calc(100vw - 2.4rem)"
  />
  <source
    type="image/jpeg"
    srcset="/imgs/ocean.jpg?width=1120 1120w,
            /imgs/ocean.jpg?width=840  840w,
            /imgs/ocean.jpg?width=560  560w,
            /imgs/ocean.jpg?width=340  340w"
    sizes="(min-width: 610px) 560px,
           calc(100vw - 2.4rem)"
  />
  <img
    src="/imgs/ocean.jpg?width=560"
    width="560px"
    height="234px"
    alt="wild ocean with a clear sky"
  />
</picture>
```

You can see that the `<source>` tag looks a lot like our previous image tag, just that we now set the type as an attribute. We also again add a fallback, this time with an `<img>` tag thats get ignored by a browser that supports `<picture>`. Here is how all this looks like, feel free to take a look in the inspector:

<figure>
  <PictureExample />
  <figcaption>
    Image loaded using the picture tag
  </figcaption>
</figure>

There is a lot of repetition, so this lends itself to two things: automatic generation and gzip/brotli compression, so the transmitted size will be quite small.

## Generating Markup with a React Component

*TODO: go into detail about auto generating react component*

[^1]: https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks/
[^2]: Image by https://unsplash.com/@corrynewooten