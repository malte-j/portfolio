import React from "react"
import style from "./footer.module.scss"

export default () => (
  <footer className={style.footer}>
    <p>© {new Date().getFullYear()} Malte Janßen</p>
    <a href="https://www.linkedin.com/in/malte-j" rel="noreferrer" target="_blank">LinkedIn</a>

    <a href="https://github.com/skyguardian42" rel="noreferrer" target="_blank">GitHub</a>

    <a href="mailto:hi@malts.me" rel="noreferrer" target="_blank">hi@malts.me</a>
  </footer>
)