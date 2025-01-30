import React, { useEffect } from "react";
import * as s from "./Bottle.module.scss";

export default function Bottle() {
  useEffect(() => {
    // add body::after {opacity: 0;} to css
    document.body.dataset.bottle = "true";

    return () => {
      document.body.dataset.bottle = "false";
    };
  }, []);

  // const takePhoto = () => {

  return (
    <div className={s.bottle}>
      <div>
        <p>oh, hi, you found my bottle! 👋🏻</p>
        <p>
          it would be very cool of if you could get in touch, so that I can get
          it back!
        </p>
        <p>down below ↓ are some places where you can reach me!</p>
      </div>
    </div>
  );
}
