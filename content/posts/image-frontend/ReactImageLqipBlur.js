import React, { useRef, useEffect, useState } from "react"
import * as s from './Image.module.scss'

export default function ReactImageLqipBlur({ id, lqip, width, height, sizes, widths, alt }) {
  const pictureRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [clicked, setClicked] = useState(false);

  const url = ""
  // const aspectRatio = width / height;


  function onLoadFinished() {
    if (!pictureRef.current) return;
    setLoading(false)
  }

  // add a event listener to the img


  useEffect(() => {
    setTimeout(() => {

    }, 6000)
  })

  const load = () => {
    setTimeout(() => {
      if (!pictureRef.current) return;
      pictureRef.current.childNodes.forEach(childNode => {
        if (childNode instanceof HTMLSourceElement) {
          childNode.srcset = childNode.dataset.srcset || '';
        }
      })

      const imgEl = pictureRef.current.querySelector('img')
      if (!imgEl) return;

      imgEl.addEventListener('load', onLoadFinished);
      return () => imgEl.removeEventListener('load', onLoadFinished);
    }, 400)
  }

  const srcset = (format) => widths.map(scaledWidth => {
    // const scaledHeight = Math.round(scaledWidth / aspectRatio);
    return `${url}/${id}_${scaledWidth}w.${format} ${scaledWidth}w`;
  }).join(',');

  return (
    <div style={{"position": "relative"}}>
      <div className={s.buttonWrapper} data-clicked={clicked}>
        <button className={s.loadButton} onClick={() => {load(); setClicked(true)}}>load image</button>
      </div>
      <div className={s.wrapper} style={{ "aspectRatio": width + '/' + height, "overflow": "hidden" }}>
        <picture ref={pictureRef} data-loading={loading}>
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
    </div>
  )
}