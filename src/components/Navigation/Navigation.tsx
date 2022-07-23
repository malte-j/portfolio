import { Link } from "gatsby";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import React from "react";
import { useEffect } from "react";
import "./Navigation.scss";

export default function Navigation() {
  const [hasScrolled, setHasScrolled] = React.useState(false);

  const darkmodeMediaQuery = React.useRef(
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-color-scheme: dark)")
      : null
  );

  /**
   * @type ["light" | "dark"]
   */
  const [currentTheme, setCurrentTheme] = React.useState(() => {
    if (typeof localStorage == "undefined" || typeof document == "undefined")
      return "light";

    const theme =
      localStorage.getItem("theme") ??
      (darkmodeMediaQuery.current?.matches ? "dark" : "light");

    document.body.dataset.theme = theme;
    return theme;
  });

  function handleDarkmodeMediaQueryChange(event) {
    const updatedTheme = event.matches ? "dark" : "light";
    setCurrentTheme(updatedTheme);
    document.body.dataset.theme = updatedTheme;
    localStorage.setItem("theme", updatedTheme);
  }

  useEffect(() => {
    if (!darkmodeMediaQuery.current) return;
    darkmodeMediaQuery.current.addEventListener(
      "change",
      handleDarkmodeMediaQueryChange
    );
    return () =>
      darkmodeMediaQuery.current?.removeEventListener(
        "change",
        handleDarkmodeMediaQueryChange
      );
  }, [darkmodeMediaQuery]);

  function toggleTheme() {
    const updatedTheme = currentTheme === "dark" ? "light" : "dark";

    setCurrentTheme(updatedTheme);
    document.body.dataset.theme = updatedTheme;
    localStorage.setItem("theme", updatedTheme);
  }

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
        <button onClick={toggleTheme} className="nav__icon">
          <img
            src={currentTheme === "dark" ? "/sun.svg" : "/moon.svg"}
            alt="toggle theme"
            title="Theme wechseln"
          />
        </button>
      </div>
    </nav>
  );
}
