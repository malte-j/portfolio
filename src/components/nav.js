import React from "react"
import { AnchorLink } from "gatsby-plugin-anchor-links";

export default ()=>{
  return (
    <nav>
      <ul>
        <AnchorLink to="/#about" title="Über mich" />
        <AnchorLink to="/#projects" title="Projekte" />
        <AnchorLink to="/#contact" title="Kontakt" />
      </ul>
    </nav>
  )
};