import React from 'react'

export default () => {
  return (
      <picture>
      <source
        type="image/avif"
        srcSet="/ocean_1120w.avif 1120w,
                /ocean_840w.avif 840w,
                /ocean_560w.avif 560w,
                /ocean_340w.avif 340w"
        sizes="(min-width: 610px) 560px,
              calc(100vw - 2.4rem)"
      />
      <source
        type="image/jpeg"
        srcSet="/ocean_1120w.jpg 1120w,
                /ocean_840w.jpg 840w,
                /ocean_560w.jpg 560w,
                /ocean_340w.jpg 340w"
        sizes="(min-width: 610px) 560px,
              calc(100vw - 2.4rem)"
      />
      <img
        width="560px"
        height="234px"
        src="/ocean_560w.jpg"
        alt="wild ocean with a clear sky"
        style={{width: "100%", height: "auto"}}
      />
   </picture>
  )
}