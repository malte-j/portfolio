import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { AnchorLink } from "gatsby-plugin-anchor-links";

import Window from "../components/window"
import Nav from "../components/nav"
import Contact from "../components/contactForm"
import SEO from "../components/SEO"
import Footer from "../components/footer"

export default ({ data }) => {
  
  let projects = data.allMarkdownRemark.edges
  
  return(
  <div className="app">
    <SEO/>
    <section className="header" id="about">
      <div className="info">
        <h1>Hi, ich bin Malte.</h1>
        <h1>Webentwickler und Student.</h1>
        <AnchorLink to="/#contact" title="Kontaktier mich!" />
      </div>

      <div className="spacer"></div>

      <Window/>
    </section>

    <Nav/>

    <h2>Ausgewählte Projekte:</h2>

    <section className="projects" id="projects">
    {
      projects.map(({node: project}) =>
        <article className="project" id={project.frontmatter.title} key={project.id}>
          <div className="project__thumbnail">
              <Img fluid={project.frontmatter.thumbnail.childImageSharp.fluid}/>
          </div>
      
          <div className="project__details">
            <div className="project__header">
              <h3 className="project__header__title">{project.frontmatter.title}</h3>
              {/* <Link className="project__header__title" to={project.frontmatter.path}>{project.frontmatter.title}</Link> */}
              <p className="project__header__date">{project.frontmatter.date}</p>
            </div>
            <p className="project__about">{project.excerpt}</p>
            <ul className="project__stack">
              {
                project.frontmatter.stack.map(tech => <li key={tech}>{tech}</li>)
              }
            </ul>

            <ul className="project__links">
              {(function generateLinks() {
                const rawLinks = project.frontmatter.links 
                const links = JSON.parse(rawLinks.replace(/'/g, `"`))
                return links.map((link, id)=>(<li key={id}><a target="_blank" rel="noopener noreferrer" href={link[1]}>{link[0]}</a></li>))
              })()}
            </ul>
          </div>
        </article>
      )
    }
    </section>

    <h2 className="contact">Kontakt:</h2>

    <Contact />

    <Footer/>
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
            links
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 600) {
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

