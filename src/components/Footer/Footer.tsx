import React from "react";
import GitHubIcon from "../../icons/GitHub";
import LinkedInIcon from "../../icons/LinkedIn";
import OpenLetterIcon from "../../icons/OpenLetter";
import * as style from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={style.footer}>
      <p>&copy; {new Date().getFullYear()} Malte Janßen</p>
      <a
        href="https://www.linkedin.com/in/malte-j"
        rel="noreferrer"
        target="_blank"
      >
        <LinkedInIcon />
        LinkedIn
      </a>

      <a
        href="https://github.com/skyguardian42"
        rel="noreferrer"
        target="_blank"
      >
        <GitHubIcon />
        GitHub
      </a>

      <a href="mailto:hi@malts.me" rel="noreferrer" target="_blank">
        <OpenLetterIcon />
        hi@malts.me
      </a>
    </footer>
  );
}
