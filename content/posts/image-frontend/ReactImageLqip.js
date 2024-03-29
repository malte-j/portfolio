import React, {useRef, useEffect} from "react"

export default function ReactImageLqip({id, lqip, width, height, sizes, widths, alt}) {
  const pictureRef = useRef(null);

  const url = ""
  // const aspectRatio = width / height;

  useEffect(() => {
    if(!pictureRef.current) return;
    

    pictureRef.current.childNodes.forEach(childNode => {
      if(childNode instanceof HTMLSourceElement) {
        childNode.srcset = childNode.dataset.srcset || '';
      }
    })
    // setTimeout(()=>{
    // }, 6000)
  })

  const srcset = (format) => widths.map(scaledWidth => {
    // const scaledHeight = Math.round(scaledWidth / aspectRatio);
    return `${url}/${id}_${scaledWidth}w.${format} ${scaledWidth}w`;
  })
  .join(',');

  return (
  <div className="wrapper"  style={{"aspectRatio": width + '/' + height, "overflow": "hidden"}}>
    <picture ref={pictureRef}>
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
        style={{width: "100%", height: "auto"}}
        />
    </picture>
  </div>
  )
}