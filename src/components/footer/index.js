import React from "react"
import style from "./footer.module.scss"

export default () => (
  <footer className={style.footer}>
    <p>© {new Date().getFullYear()} Malte Janßen</p>
    <a href="mailto:hi@malts.me" target="_blank">hi@malts.me</a>
  </footer>
)