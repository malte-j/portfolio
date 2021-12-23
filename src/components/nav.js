import React from "react";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { Link } from "gatsby";
export default function Nav() {
  return (
    <nav>
      <div className="inner">
        <AnchorLink to="/#about">
          <span>Über mich</span>
        </AnchorLink>
        <AnchorLink to="/#projects">
          <span>Projekte</span>
        </AnchorLink>
        <Link to="/blog">Blog</Link>
        <AnchorLink to="/#contact">
          <span>Kontakt</span>
        </AnchorLink>
      </div>
    </nav>
  );
}
