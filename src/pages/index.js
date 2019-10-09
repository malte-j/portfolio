import React from "react"
import { graphql } from "gatsby"
import "../styles/global.css"
import Window from "../components/window"

// import Img from "gatsby-image"

export default ({ data }) => (
  <div className="flex">
    <h1>Hi, ich bin</h1>

    <Window/>

    <h1>Malte</h1>
  </div>
)

export const query = graphql`
  query {
    file(relativePath: { eq: "static/bottom.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
