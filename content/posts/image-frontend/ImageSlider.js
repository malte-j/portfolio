import React, {useRef} from "react"

export default () => {
  const videoRef = useRef();



  function setTime(percentage) {
    console.log(percentage)
    if(!videoRef.current) return

    videoRef.current.currentTime = videoRef.current.duration * (percentage / 100)
  }

  return (
    <div style={{"marginBottom": "1.8rem"}}>
      <video ref={videoRef} style={{"width": "100%", "height": "auto", "aspectRatio": "608/240" }} src="/lqip_loading_blur_up.mp4"/>
      <input defaultValue={0} style={{width: "100%"}} type="range" step={0.01} onChange={e => setTime(e.target.value)} />
    </div>
  )
}

/*
<!-- <figure>
  <video style={{"width": "100%", "height": "auto", "aspect-ratio": "608/240" }} src="/lqip_loading_blur_up.mp4" controls/>
<figcaption>
</figcaption>
</figure> -->
*/