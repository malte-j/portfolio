import React from "react";
import * as s from "./Aside.module.scss";

const Aside = ({
  children,
  spread,
}: {
  children: React.ReactElement;
  spread?: "1/1" | "3/2";
}) => {
  return (
    <div data-spread={spread} className={s.aside}>
      {children}
    </div>
  );
};

export default Aside;
