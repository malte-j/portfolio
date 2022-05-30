import React, { useMemo, useState } from "react";
import { nanoid } from "nanoid";
import Page from "../components/Page";
import "./nanoid.scss";

export default function Nanoid() {
  let [length, storeLength] = useState(5);
  let nums = useMemo(() => {
    let arr = [];
    for (let i = 0; i < 20; i++) {
      arr.push(nanoid(length));
    }
    return arr;
  }, [length]);

  const setLength = (number) => {
    number < 1 ? storeLength(1) : storeLength(number);
  } 

  return (
    <Page  seo={{ title: "Blog | Malte Janßen" }}>
      <div
        className="n__page"
      >
        <div className="n__num">
          <button
            onClick={() => setLength(length - 1)}
            className="n__numbutton">
            <img src="/icons/radix-icons_minus.svg" alt="" />
          </button>

          <input
            type="number"
            value={length}
            className="n__numinput"
            onChange={(e) => setLength(e.target.value ? parseInt(e.target.value): null)}
            />

          <button
             onClick={() => setLength(length + 1)}
           className="n__numbutton">

            <img src="/icons/radix-icons_plus.svg" alt="" />
          </button>
        </div>


        <div
        className="n__numwrapper"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {nums.map((el, i) => (
            <code key={i + el} className="n__selectable">{el}</code>
          ))}
        </div>
      </div>
    </Page>
  );
}
