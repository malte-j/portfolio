import React from "react"

import SEO from "./SEO";
import Nav from "./nav"
import Footer from "./footer"

export default function Layout({children, className, seo}) {
  if(className) {
    className = className + " app";
  } else {
    className = "app";
  }  

  return (
    <div className={className} style={{"paddingTop": "3rem", "display": "flex", "minHeight": "100vh", "flexDirection": "column", "justifyContent": "space-between"}}>
      <SEO {...seo} />
      <Nav/>
      {children}
      <Footer/>
    </div>
  )
}