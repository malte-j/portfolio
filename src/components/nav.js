import React from "react"
import { Link } from "gatsby"

export default ()=>(
  <nav>
    <ul>
      <li><a href="/#about">Über mich</a></li>
      <li><a href="/#projects">Projekte</a></li>
      <li><a href="/#contact" style={{"color": "red"}}>Kontakt</a></li>
    </ul>
  </nav>
);