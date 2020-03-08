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
        <a className="green" href="#Aupairadise"> Frontendentwicklung </a>
        und Spaß an 
        <a className="mustard" href="#Doorlock"> Hardwareintegration</a>
        .</p>
    </section>

    <section className="projects">
    {
      projects.map(({node: project}) =>
      <article className="project" id={project.frontmatter.title} key={project.id}>

        <Link className="titlemob" to={project.frontmatter.path}>{project.frontmatter.title}</Link>
        <div className="thumb">
            <Img className="thumbnail" fluid={project.frontmatter.thumbnail.childImageSharp.fluid}/>
        </div>
            <div className="details">
              <Link className="title" to={project.frontmatter.path}>{project.frontmatter.title}</Link>
              <p className="date">{project.frontmatter.date}</p>
              <p>{project.excerpt}</p>
              <ul className="techstack">
                {
                  project.frontmatter.stack.map(tech => <li key={tech} className={"tech-" + tech.toLowerCase()}>{tech}</li>)
                }
              </ul>
            </div>

          </article>
        )
    }
    </section>

    <section className="contact">    
      <canvas id="myCanvas" width="480" height="320"></canvas>
    </section>
  </div>
)}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 140)
          frontmatter {
            title
            date(formatString: "MMMM YY", locale: "de")
            path
            stack
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 200) {
                  ...GatsbyImageSharpFluid
                }
              }
            }

          }
        }
      }
    }
  }
`

