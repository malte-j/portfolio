import React, { useRef } from "react";
import { useEffect } from "react";
import Sketch from "./Shader";
import * as s from "./Fake3DImage.module.scss";
import { Helmet } from "react-helmet";

export default function Fake3DImage({ image, depthMap }) {
  const wrapperRef = useRef(null);
  useEffect(() => {
    if (!wrapperRef.current) return;
    const sketch = new Sketch(wrapperRef.current);
    return () => sketch.destory();
  }, [wrapperRef]);

  return (
    <>
      <Helmet>
        <link rel="preload" href="/header_compressed.jpg" as="image" />
        <link rel="preload" href="/header_compressed_map.jpg" as="image" />
      </Helmet>
      <div
        id="gl"
        className={s.wrapper}
        data-image-original="header_compressed.jpg"
        data-image-depth="header_compressed_map.jpg"
        data-horizontal-threshold="12"
        data-vertical-threshold="12"
        ref={wrapperRef}
      ></div>
    </>
  );
}
