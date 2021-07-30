import React, { useRef } from "react"

export default () => {
  const videoRef = useRef()
  const canvasRef = useRef()

  const drawImage = () => {
    const ctx = canvasRef.current?.getContext("2d")
    if (
      videoRef.current === undefined ||
      canvasRef.current === undefined ||
      ctx === undefined
    ) {
      return
    }

    ctx.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    )
  }

  function handleSliderChange(e) {
    if (!videoRef.current) return
    videoRef.current.currentTime = videoRef.current.duration * (e / 100)

    const step = () => {
      drawImage()
    }

    requestAnimationFrame(step)
  }

  return (
    <div style={{ marginBottom: "1.8rem" }}>
      <video
        autoPlay={true}
        muted={true}
        onPlay={() => {
          videoRef.current.pause()
          drawImage()
        }}
        ref={videoRef}
        style={{
          width: "1%",
          aspectRatio: "608/240",
          position: "absolute",

          visibility: "hidden",

        }}
        src="/lqip_loading_blur_up.mp4"
      />
      <canvas
        style={{ width: "100%", height: "auto", aspectRatio: "608/240" }}
        ref={canvasRef}
      />
      <input
        defaultValue={0}
        style={{ width: "100%" }}
        type="range"
        step={0.01}
        onChange={e => handleSliderChange(e.target.value)}
      />
    </div>
  )
}
