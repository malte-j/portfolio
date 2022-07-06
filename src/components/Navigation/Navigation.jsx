import { Link } from "gatsby";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import React from "react";
import "./Navigation.scss";

export default function Navigation() {
  const [hasScrolled, setHasScrolled] = React.useState(false);
  const [currentTheme, setCurrentTheme] = React.useState("light");

  /**
   * @param {"light" | "dark"} theme
   */
  function setTheme(theme) {
    document.body.dataset.theme = theme;
    localStorage.setItem("theme", theme);
    setCurrentTheme(theme);
  }

  function toggleTheme() {
    setTheme(currentTheme === "light" ? "dark" : "light");
  }

  React.useEffect(() => {
    const previousTheme = localStorage.getItem("theme");
    if (previousTheme) {
      setTheme(previousTheme);
    } else {
      const isDarkMode =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(isDarkMode ? "dark" : "light");
    }
  }, []);

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
