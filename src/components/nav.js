import React from "react"
// import { Link } from "gatsby"
// import scrollToElement from "scroll-to-element"
import { AnchorLink } from "gatsby-plugin-anchor-links";

export default ()=>{
  
  // const handleClick = (e, target) => {
  //   if (typeof window !== 'undefined') {
  //     if (window.location.pathname === '/') {
  //       if (e) e.preventDefault()
  //         // document.querySelector(target).scrollIntoView()
       
  //       scrollToElement(target, {
  //         offset: -80, // Offset a fixed header if you please
  //         duration: 500,
  //         ease: "in-quad"
  //       })
  //     }
  //   }
  // }
  
  return (
    <nav>
      <ul>
        {/* <li><Link onClick={e=>handleClick(e, "#about")}>Über mich</Link></li>
        <li><Link onClick={e=>handleClick(e, "#projects")}>Projekte</Link></li>
        <li><Link onClick={e=>handleClick(e, "#contact")}>Kontakt</Link></li> */}
        <AnchorLink to="/#about" title="Über mich" />
        <AnchorLink to="/#projects" title="Projekte" />
        <AnchorLink to="/#contact" title="Kontakt" />

      </ul>
    </nav>
  )
};