import React from "react"
import { Link, graphql } from "gatsby"
import "../styles/global.scss"
import Img from "gatsby-image"

import Window from "../components/window"

// import Img from "gatsby-image"

export default ({ data }) => {
  
  let projects = data.allMarkdownRemark.edges
  
  return(
  <div className="app">
    <section className="header">
      <h1>
        Hi, 
        <br/>
        ich bin
      </h1>

      <Window/>

      <h1>Malte</h1>
    </section>

    <section className="about">
      <p>
        Student an der
        <a className="purple" href="/"> BHT Berlin </a>
        mit großem Interesse an
        <a className="pink" href="/"> Webdesign</a>
        , einer Menge Erfahrung in
        <a className="green" href="/"> Frontendentwicklung </a>
        und Spaß an 
        <a className="mustard" href="/"> Hardwareintegration</a>
        .</p>
    </section>

    <section className="projects">
    {
      projects.map(({node: project}) =>
      <article className="project" key={project.id}>
        <Link className="titlemob" to={project.frontmatter.path}>{project.frontmatter.title}</Link>

        <div className="thumb">
            <Img className="thumbnail" fluid={project.frontmatter.thumbnail.childImageSharp.fluid}/>
        </div>
            <div className="details">
              <Link className="title" to={project.frontmatter.path}>{project.frontmatter.title}</Link>
              <p>{project.frontmatter.date}</p>
              <p>{project.excerpt}</p>
            </div>

          </article>
        )
    }
    </section>
  </div>
)}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 200) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            date(formatString: "MMMM YY", locale: "de")
            path

          }
        }
      }
    }
  }
`

