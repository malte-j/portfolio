import React, { useEffect } from "react";
import { useRef } from "react";
// @ts-expect-error
import riveWASMResource from "@rive-app/canvas-lite/rive.wasm";
import { Rive, StateMachineInput, RuntimeLoader } from "@rive-app/canvas-lite";
// @ts-expect-error
import riveFile from "./t3.riv";

const RiveScroll = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    console.log("rive", riveWASMResource);
    RuntimeLoader.setWasmUrl(riveWASMResource);
    let stateMachineLoadInput: StateMachineInput;

    if (!canvasRef.current) throw new Error("canvas element not found");

    // 🚨 make sure to change the artboard and state machine names to match your rive file
    const r = new Rive({
      src: riveFile,
      canvas: canvasRef.current,
      autoplay: true,
      stateMachines: "State Machine 1",
      artboard: "Artboard",

      onLoad: () => {
        stateMachineLoadInput = r.stateMachineInputs("State Machine 1")[0];
        stateMachineLoadInput.value = 0;
        r.resizeDrawingSurfaceToCanvas();
      },
    });

    let resizeTimeout: any | null = null;
    const onResize = () => {
      if (resizeTimeout === null) {
        resizeTimeout = setTimeout(() => {
          r.resizeDrawingSurfaceToCanvas();
          resizeTimeout = null;
        }, 200);
      }
    };
    window.addEventListener("resize", onResize, { passive: true });

    const onScroll = () => {
      if (!stateMachineLoadInput) return;

      const scrollAmount = window.scrollY;

      // window height
      const windowHeight = window.innerHeight;

      const scrollPercentage = (scrollAmount / windowHeight) * 100;
      stateMachineLoadInput.value = scrollPercentage;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [canvasRef.current]);

  return (
    <div>
      <canvas
        style={{
          width: "100%",
        }}
        ref={canvasRef}
        id="rive-canvas"
        width="798"
        height="436"
      />
    </div>
  );
};

export default RiveScroll;
