import React from "react"
import { Link, graphql } from "gatsby"
import "../styles/global.scss"
import Img from "gatsby-image"

import Window from "../components/window"
import Nav from "../components/nav"

// import Img from "gatsby-image"

export default ({ data }) => {
  
  let projects = data.allMarkdownRemark.edges
  
  return(
  <div className="app">
    <section className="header">
      <h1>
        Hi, ich bin
      </h1>

      <Window/>

      <h1>Malte</h1>
    </section>

    <Nav/>

    <section className="about" id="about">
      <p>
        Student an der <a className="purple" href="/">BHT Berlin</a> mit großem Interesse an <a className="pink" href="/"> Webdesign</a>, einer Menge Erfahrung in <a className="green" href="#Aupairadise"> Frontendentwicklung</a> und Spaß an <a className="mustard" href="#Doorlock">Hardwareintegration</a>.</p>
    </section>

    <div className="cta"><a href="#contact">Schreib mir eine Nachricht!</a></div>

    <section className="projects" id="projects">
    {
      projects.map(({node: project}) =>
        <article className="project" id={project.frontmatter.title} key={project.id}>
          <div className="project__thumbnail">
              <Img fluid={project.frontmatter.thumbnail.childImageSharp.fluid}/>
          </div>
      
          <div className="project__details">
            <div className="project__header">
              <Link className="project__header__title" to={project.frontmatter.path}>{project.frontmatter.title}</Link>
              <p className="project__header__date">{project.frontmatter.date}</p>
            </div>
            <p className="project__about">{project.excerpt}</p>
            <ul className="project__stack">
              {
                project.frontmatter.stack.map(tech => <li key={tech}>{tech}</li>)
              }
            </ul>

            <ul className="project__links">
              <li><Link to={project.frontmatter.path}>Liveansicht</Link></li>
              <li>Github</li>
              <li>Mehr erfahren</li>
            </ul>

          </div>

        </article>
      )
    }
    </section>

    <section className="contact" id="contact">    
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
          excerpt(pruneLength: 180)
          frontmatter {
            title
            date(formatString: "MMMM YYYY", locale: "de")
            path
            stack
            live
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 800) {
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

