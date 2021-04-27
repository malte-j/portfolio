import React from "react"
import { graphql } from "gatsby"
import { AnchorLink } from "gatsby-plugin-anchor-links";

import Window from "../components/window"
import Nav from "../components/nav"
import Contact from "../components/contactForm"
import SEO from "../components/SEO"
import Footer from "../components/footer"
import ProjectList from "../components/projectList"

export default ({ data }) => {
  const projects = {
    featured: data.featured.edges,
    other: data.other.edges  
  }

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
      <ProjectList projects={ projects.featured }/>  

      <h2>Weitere Projekte:</h2>

      <ProjectList projects={ projects.other }/>
    </section>

    <h2 className="contact">Kontakt:</h2>

    <Contact />

    <Footer/>
  </div>
)}

export const pageQuery = graphql`
  query IndexQuery {
    featured: allMdx(sort: { order: DESC, fields: [frontmatter___date] }, filter: {frontmatter: {featured: {eq: true}}}) {
      edges {
        ...ProjectInfo
      }
    }
    other: allMdx(sort: { order: DESC, fields: [frontmatter___date] }, filter: {frontmatter: {featured: {eq: false}}}) {
      edges {
        ...ProjectInfo
      }
    }
  }
`

