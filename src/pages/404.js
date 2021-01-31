import React from "react";
import Page from "../components/Page";

export default () => (
  <Page seo={{title: '404: Nicht gefunden'}}>
    <p style={{"textAlign": "center", "paddingTop": "49vh", "margin": "0"}}>404: nicht gefunden <br/><br/><a href="/">Zurück zur Seite</a></p>
  </Page>
)