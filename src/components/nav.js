import React from "react"
import { AnchorLink } from "gatsby-plugin-anchor-links";

export default ()=>{
  return (
    <nav>
      <ul>
        <li><AnchorLink to="/#about" title="Über mich" /></li>
        <li><AnchorLink to="/#projects" title="Projekte" /></li>
        <li><AnchorLink to="/#contact" title="Kontakt" /></li>
      </ul>
    </nav>
  )
};