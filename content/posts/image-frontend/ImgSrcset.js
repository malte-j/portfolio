import React from 'react'

export default () => {
  return (
    <img 
      srcSet="/ocean_1120.jpg 1120w,
              /ocean_840w.jpg 840w,
              /ocean_560w.jpg 560w,
              /ocean_340w.jpg 340w"
      sizes="(min-width: 610px) 560px,
            calc(100vw - 2.4rem)"
      width="560px"
      height="234px"
      alt="wild ocean with a clear sky"
      src="/ocean_560w.jpg"
    />
  )
}