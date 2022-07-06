import * as React from "react";
import { graphql } from "gatsby";
import { AnchorLink } from "gatsby-plugin-anchor-links";

import Window from "../components/window";
import Nav from "../components/Navigation/Navigation";
import Contact from "../components/ContactForm";
import Seo from "../components/SEO";
import Footer from "../components/Footer";
import ProjectList from "../components/ProjectList/ProjectList";
import Fake3DImage from "../components/Fake3DImage/Fake3DImage";

export default function Index({ data }) {
  const projects = {
    featured: data.featured.edges,
    other: data.other.edges,
  };

  return (
    <div className="app">
      <Seo />
      <section className="header" id="about">
        <Fake3DImage />

        <div className="info">
          <h1>Hi, ich bin Malte.</h1>
          <h1>Webentwickler und Student.</h1>
          {/* <AnchorLink to="/#contact" title="Kontaktier mich!" /> */}
        </div>
      </section>

      <Nav />

      <h2>Ausgewählte Projekte:</h2>

      <section className="projects" id="projects">
        <ProjectList projects={projects.featured} />

        {/* <h2>Weitere Projekte:</h2> */}

        <ProjectList projects={projects.other} />
      </section>

      <h2 className="contact">Kontakt:</h2>

      <Contact />

      <Footer />
    </div>
  );
}

export const query = graphql`
  query IndexQuery {
    featured: allMdx(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { featured: { eq: true } } }
    ) {
      edges {
        ...ProjectInfo
      }
    }
    other: allMdx(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { featured: { eq: false } } }
    ) {
      edges {
        ...ProjectInfo
      }
    }
  }
`;
