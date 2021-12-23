import React from "react"

export default function ReactImage({id, lqip, width, height, sizes, widths, alt}) {
  // const pictureRef = useRef<HTMLPictureElement>(null);

  const url = ""
  // const aspectRatio = width / height;

  const srcset = (format) => widths
  .map(scaledWidth => {
    // const scaledHeight = Math.round(scaledWidth / aspectRatio);
    return `${url}/${id}_${scaledWidth}w.${format} ${scaledWidth}w`;
  })
  .join(',');

  return (
  <div className="wrapper" style={{"aspectRatio": width + '/' + height, "overflow": "hidden"}}>
    <picture>
      {
        [["image/avif", "avif"], ["image/jpeg", "jpg"]].map(format => (
          <source
            key={format[0]}
            type={format[0]}
            sizes={sizes.join(',')}
            srcSet={srcset(format[1])}
            />
        ))
      }
      <img
        src={`${url}/${id}.jpg`}
        alt={alt}
        width={width}
        height={height}
        style={{width: "100%", height: "auto"}}
        />
    </picture>
  </div>
  )
}