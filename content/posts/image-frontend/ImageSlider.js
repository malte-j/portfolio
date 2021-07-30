import React, { useRef, useState, useEffect } from "react"
import s from './Image.module.scss';

export default ({id, lqip, width, height, sizes, widths, alt}) => {
  const pictureRef = useRef(null);
  const [sliderVal, setSliderVal] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [opacity, setOpacity] = useState(1) 

  useEffect(() => {
    setLoaded(sliderVal >= 23);
    requestAnimationFrame(() => {
      let x  = sliderVal || 0;
      let n = 2.3;
      let s = 0.5;

      let fx = (-(n * x - 50 * n) / 100 + s);
      setOpacity(-(Math.cos(Math.PI * Math.min(Math.max(0, fx), 1)) - 1) / 2)
    })
  }, [sliderVal])

  const srcset = (format) => widths.map(scaledWidth => {
    return `/${id}_${scaledWidth}w.${format} ${scaledWidth}w`;
  }).join(',');

  return (
    <div style={{ marginBottom: "1.8rem" }}>
      <div className={s.wrapper} style={{ "aspectRatio": width + '/' + height, "overflow": "hidden", "--opacity": opacity }}>
        <picture ref={pictureRef} className={s.sliderPicture}>
          {
            [["image/avif", "avif"], ["image/jpeg", "jpg"]].map(format => (
              <source
                key={format[0]}
                type={format[0]}
                sizes={sizes.join(',')}
                srcSet={loaded ? srcset(format[1]) : `data:image/jpeg;base64,${lqip}`}
              />
            ))
          }
          <img
            src={`/${id}.jpg`}
            alt={alt}
            width={width}
            height={height}
            style={{ width: "100%", height: "auto" }}
          />
        </picture>
      </div>
      
      <input
        style={{ width: "100%" }}
        type="range"
        step={0.01}
        onChange={e => setSliderVal(e.target.value)}
        value={sliderVal}
      />
    </div>
  )
}
