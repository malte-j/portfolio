import React from "react";
import * as style from "./DemoComponent.module.scss"

const DemoComponent = () => {
  return (
  <div className={style.demoComponent}>
    <svg>
      <rect width="500" height="300" fill="#000"/>
    </svg>
  </div>)
}

export default DemoComponent;