---
  title: Image Upload and Download with LQUIP, Dynamic resizing, dynamic formats and caching
  path: "/blog/express-image-upload"
  date: "2021-05-10"
---

Problem: Image upload
  - security:
    - root url
    - upload size
    - auth check first
Problem 2: Image download
  - modern web: 
    - different sizes
      - design not known (working in sprints, finishing the backend first)
      - different screens
      - different dpi's
    - different formats
      - different devices with different supports (avif not available but fricking small)
  - caching:
    - speed comparison
    
approach
  upload multer
  file format
  store id in database for later retrieval
    - store and generate lqipimage upload resize dynamic


Images are an integral part of todays web landscape. But a lot of sites aren't using the capabilities of modern browsers to their full extent. Using modern techniques, like the native <picture> Element, you can use let the users browser do all the hard work of determining the optimal format and size for an image, but only if you are able to supply the multitude of required formats.

This is not easy task, but a rewarding one. By now we are all aware of the importance of optimizing the mobile experience, but images are still often overlooked and can be hard to optimize. Different browsers support different image formats(AVIF images are still not supported everywhere), customers may use older or less expensive devices with differing DPI ratios and screen sizes, and some users may access your site using their home network and some using their slow mobile data on the subway.

For all those szenarios, there is an optimal image format. And because images are, at least for a lot if not most sites, the biggest traffic source, this area benefits a lot from optimization.

But how can we achieve this and create a better browsing experience, and thus conversion rates / whatever metric you are optimizing?

This article tries to showcase modern techniques for achieving an optimal image experience and highlight some pitfalls you might encounter while developing a solution for these problems.

## Uploading an image

The first step for a better image experience begins with image upload. 

For this post I've setup a simple Express server connected to a Mongo database, but you are free to use whatever type of database you want.

The upload part is handled by [Multer](#). This an image upload middleware for Express that handles the upload of the raw image by the user. After the initial upload we also generate an LQUIP(low quality image placeholder) using [sharp](#)(We will also use this later to generate different image sizes and formats). This will later be used for loading a blurry preview of the image to reduce the perceived loading time of the image. We can store this low resolution version in our database because it is extremely tiny. This way we can also send it along the first request when a user requests, for example, a post.

We will split the logic into two files, `imagesService.js` and `images.js`, to make the code a little more readable.

First, we generate the middleware for uploading a file that can later be used in a route in `images.js`:

```js
// src/routes/images/imagesService.js
export const uploadMiddleware = multer({
  limits: {
    // limit filesize to 5MB, you can change this if your applications needs larger images
    fileSize: 5 * 1024 * 1024
  },
  // configure multer to save incoming files to disk
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      // configure multer to store images in '/public/img'
      cb(null, path.join(process.cwd(), '/public/img'))
    },
    filename: (req, file, cb) => {
      // We use a MongoDb ObjectId as the filename to link it more easily to our database
      const name = new mongoose.Types.ObjectId();
      file.originalname = name;
      cb(null, `${name}`)
    }
  }),
  filter: (req, file, cb) => {
    // in this example I restrict uploaded images to png and jpeg for simplicity, you can change this if you want
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload an image.'), false);
    }
  }
}).single('image')
```

We limit the maximum file size to prevent abuse, you can raise the limit if your application can handle the increased size.

We also save incoming files directly to disk. This way we can keep our memory consumption low, as the file gets saved to disk while the transfer is going on, so there is no point at which the whole file is loaded in memory.

For the filename we use a MongoDB ObjectId. This makes it easy for us to use it as a primary key in our database. Depending on your application, this could actually pose a security risk as ObjectID's are potentially guessable. (SOURCE HERE, STACKOVERFLOW THREAD). You could change this to use any kind of random string generation you like.

### Upload logic

```js
// src/routes/images/imagesService.js

export async function createImage(image, user) {
  if(!image)
    throw new Error("No image provided");

  // generate LQIP for given image, with a maximum of 20px in either width or height
  const lqipData = await sharp(image.path)
    .resize(20, 20, {
      fit: sharp.fit.inside,
      withoutEnlargement: true
    })
    .toBuffer()

  // create a new entry in the database for the uploaded file 
  let imageDbEntry = new Image({
    _id: new mongoose.Types.ObjectId(image.originalname),
    _user: new mongoose.Types.ObjectId(user._id),
    format: image.mimetype.split('/')[1],
    lqip: `data:image/png;base64,${lqipData.toString('base64')}`
  });
  imageDbEntry.save();
  
  return {
    id: imageDbEntry._id,
    url: config.backendUrl + '/img/' + image.filename,
    lqip: imageDbEntry.lqip
  }
}
```

Next, we provide a function for saving a reference to our image in the database. During this, we also create the LQUIP for the image using sharp and save it as base64 so we can use it directly in a `src` attribute on our frontend.

### Requesting an image

For us to 


Image id: maybe not use objectid for security reasons like guessable names, etc. 