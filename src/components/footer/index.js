import React, {useState} from "react"
import style from "./footer.module.scss"

//create your forceUpdate hook
function useForceUpdate(){
  const [, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}

export default () => {
  const forceUpdate = useForceUpdate();


  function toggleTheme() {
    if(document.body.dataset.theme === "dark") {
      document.body.dataset.theme = "light";
      localStorage.setItem("theme", "light")
      forceUpdate();
    } else {
      document.body.dataset.theme = "dark";
      localStorage.setItem("theme", "dark")
      forceUpdate();
    }
  }

  return (
    <footer className={style.footer}>
      <p>© {new Date().getFullYear()} Malte Janßen</p>
      <a href="https://www.linkedin.com/in/malte-j" rel="noreferrer" target="_blank">LinkedIn</a>
  
      <a href="https://github.com/skyguardian42" rel="noreferrer" target="_blank">GitHub</a>
  
      <a href="mailto:hi@malts.me" rel="noreferrer" target="_blank">hi@malts.me</a>

      <button onClick={toggleTheme} className={style.themeToggle}>
        {
          document.body.dataset.theme === "dark" ? (
            <img src="/sun.svg" alt="toggle theme" />
          ) : (
            <img src="/moon.svg" alt="toggle theme" />
          )
        }
      </button>
    </footer>
  )
}