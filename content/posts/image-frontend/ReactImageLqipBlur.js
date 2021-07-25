import React, { useRef, useEffect } from "react"
import s from './Image.module.scss'

export default ({ id, lqip, width, height, sizes, widths, alt }) => {
  const pictureRef = useRef(null);

  const url = ""
  // const aspectRatio = width / height;


  function onLoadFinished() {
    if (!pictureRef.current) return;
    pictureRef.current.dataset.loading = "false";
  }

  // add a event listener to the img


  useEffect(() => {
    setTimeout(() => {
      if (!pictureRef.current) return;
      pictureRef.current.childNodes.forEach(childNode => {
        if (childNode instanceof HTMLSourceElement) {
          childNode.srcset = childNode.dataset.srcset || '';
        }
      })
    }, 6000)
  })

  // this needs to happen after the srcset gets switched, otherwise
  // the onload for the LQIP will trigger this
  useEffect(() => {
    setTimeout(() => {
      if(!pictureRef.current) return;
      const imgEl = pictureRef.current.querySelector('img')
      if(!imgEl) return;

      imgEl.addEventListener('load', onLoadFinished);
      return () => imgEl.removeEventListener('load', onLoadFinished);
    }, 6000)
  }, [])



  const srcset = (format) => widths.map(scaledWidth => {
    // const scaledHeight = Math.round(scaledWidth / aspectRatio);
    return `${url}/${id}_${scaledWidth}w.${format} ${scaledWidth}w`;
  })
    .join(',');

  return (
    <div className={s.wrapper}  style={{"aspectRatio": width + '/' + height, "overflow": "hidden"}}>
      <picture ref={pictureRef} data-loading={true}>
        {
          [["image/avif", "avif"], ["image/jpeg", "jpg"]].map(format => (
            <source
              key={format[0]}
              type={format[0]}
              sizes={sizes.join(',')}
              srcSet={`data:image/jpeg;base64,${lqip}`}
              data-srcset={srcset(format[1])}
            />
          ))
        }
        <img
          src={`${url}/${id}.jpg`}
          alt={alt}
          width={width}
          height={height}
          style={{ width: "100%", height: "auto" }}
        />
      </picture>
    </div>
  )
}