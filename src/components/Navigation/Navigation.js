import { Link } from "gatsby";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import React from "react";
import "./Navigation.scss";

export default function Navigation() {
  const [hasScrolled, setHasScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 2);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
