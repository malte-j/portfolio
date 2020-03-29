import React from "react"
import { Link, graphql } from "gatsby"
import "../styles/global.scss"
import Img from "gatsby-image"
import { AnchorLink } from "gatsby-plugin-anchor-links";

import Window from "../components/window2"
import Nav from "../components/nav"
import Contact from "../components/contactForm"
// import Img from "gatsby-image"

export default ({ data }) => {
  
  let projects = data.allMarkdownRemark.edges
  
  return(
  <div className="app">
    <section className="header">
      <div className="info">
        <p>Hi, ich bin Malte</p>
        <p>Webentwickler und Student</p>
        <AnchorLink to="/#contact" title="Kontaktier mich!" />
      </div>

    <div className="spacer"></div>

      <Window/>
    </section>

    <Nav/>

    {/* <section className="about" id="about">
      <p>
        Student an der <a className="purple" href="/">BHT Berlin</a> mit großem Interesse an <a className="pink" href="/"> Webdesign</a>, einer Menge Erfahrung in <a className="green" href="#Aupairadise"> Frontendentwicklung</a> und Spaß an <a className="mustard" href="#Doorlock">Hardwareintegration</a>.</p>
    </section> */}

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
              {Object.entries(project.frontmatter.links).map(link => {
                let linkText
                if(link[1] !== null) {
                  switch (link[0]) {
                    case 'github':
                      linkText = "GitHub"
                      break;
                    case 'live':
                      linkText = "Liveansicht"
                      break;
                    case 'more':
                      linkText = "Mehr erfahren"
                      break;
                    default:
                      linkText = link[0]
                      break;
                  }  
                  return (<li key={link[0]}><a href={link[1]}>{linkText}</a></li>)
                }
                return null
              })}
            </ul>
          </div>
        </article>
      )
    }
    </section>

    <Contact />
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
            links {
              github
              live
              more
            } 
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

