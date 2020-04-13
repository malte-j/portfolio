import React from "react"
import Nav from "../components/nav"

export default () => (
  <div className="app" style={{"paddingTop": "2rem"}}>
    <Nav/>
    <p style={{"textAlign": "center", "paddingTop": "49vh", "margin": "0"}}>404: nicht gefunden <br/><br/><a href="/">Zurück zur Seite</a></p>
  </div>
)