import React, { useRef } from "react";
import { useEffect } from "react";
import Sketch from "./Shader";
import * as s from "./Fake3DImage.module.scss";

export default function Fake3DImage({ image, depthMap }) {
  const wrapperRef = useRef(null);
  useEffect(() => {
    if (!wrapperRef.current) return;
    const sketch = new Sketch(wrapperRef.current);
    let x = 0;
    return () => sketch.destory();
  }, [wrapperRef]);

  return (
    <div
      id="gl"
      className={s.wrapper}
      data-image-original="header_compressed.webp"
      data-image-depth="header_compressed_map.webp"
      data-horizontal-threshold="12"
      data-vertical-threshold="12"
      ref={wrapperRef}
    ></div>
  );
}
