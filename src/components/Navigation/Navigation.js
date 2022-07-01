import React, { useState } from "react";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { Link } from "gatsby";
import "./Navigation.scss";

export default function Navigation() {
  const [hasScrolled, setHasScrolled] = React.useState(false);

  useState(()=>{
    const listener = window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    });


    return () => window.removeEventListener("scroll", listener);
  }, [])

  return (
    <nav data-has-scrolled={hasScrolled}>
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
