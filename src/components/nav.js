import React from "react"
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { Link } from "gatsby";
export default () => {
  return (
    <nav>
      <ul>
        <li><AnchorLink to="/#about" title="Über mich" /></li>
        <li><AnchorLink to="/#projects" title="Projekte" /></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><AnchorLink to="/#contact" title="Kontakt" /></li>
      </ul>
    </nav>
  )
};