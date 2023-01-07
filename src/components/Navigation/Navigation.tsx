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

  const [currentTheme, setCurrentTheme] = React.useState<
    "light" | "dark" | null
  >(null);

  useEffect(() => {
    const theme = document.body.dataset.theme as "dark" | "light";
    setCurrentTheme(theme);
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

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav data-has-scrolled={hasScrolled}>
      <div className="inner">
        <AnchorLink to="/#about">
          <span>about</span>
        </AnchorLink>
        <AnchorLink to="/#projects">
          <span>projects</span>
        </AnchorLink>
        <Link to="/blog">blog</Link>
        <AnchorLink to="/#contact">
          <span>contact</span>
        </AnchorLink>
        <button onClick={toggleTheme} className="nav__icon">
          <img
            src="/sun.svg"
            alt="toggle theme"
            title="Theme wechseln"
            data-theme="light"
          />
          <img
            src="/moon.svg"
            alt="toggle theme"
            data-theme="dark"
            title="Theme wechseln"
          />
        </button>
      </div>
    </nav>
  );
}
