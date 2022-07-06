import React, { useState, useEffect } from "react";
import * as style from "./footer.module.scss";

export default function Footer() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setTheme(document.body.dataset.theme);
  }, []);

  function toggleTheme() {
    if (document.body.dataset.theme === "dark") {
      document.body.dataset.theme = "light";
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.body.dataset.theme = "dark";
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  }

  return (
    <footer className={style.footer}>
      <p>© {new Date().getFullYear()} Malte Janßen</p>
      <a
        href="https://www.linkedin.com/in/malte-j"
        rel="noreferrer"
        target="_blank"
      >
        LinkedIn
      </a>

      <a
        href="https://github.com/skyguardian42"
        rel="noreferrer"
        target="_blank"
      >
        GitHub
      </a>

      <a href="mailto:hi@malts.me" rel="noreferrer" target="_blank">
        hi@malts.me
      </a>

      <button onClick={toggleTheme} className={style.themeToggle}>
        <img
          src={theme === "dark" ? "/sun.svg" : "/moon.svg"}
          alt="toggle theme"
        />
      </button>
    </footer>
  );
};
