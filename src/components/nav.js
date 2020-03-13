import React from "react"
import { Link } from "gatsby"

export default ()=>{
  
  const handleClick = (e, target) => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname === '/') {
        if (e) e.preventDefault()
          document.querySelector(target).scrollIntoView()
       
        // scrollToElement(target, {
        //   offset: -95, // Offset a fixed header if you please
        //   duration: 1000,
        // })
      }
    }
  }
  
  return (
    <nav>
      <ul>
        <li><Link onClick={e=>handleClick(e, "#about")}>Über mich</Link></li>
        <li><Link onClick={e=>handleClick(e, "#projects")}>Projects</Link></li>
        <li><Link onClick={e=>handleClick(e, "#contact")}>Kontakt</Link></li>
      </ul>
    </nav>
  )
};