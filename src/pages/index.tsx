import * as React from "react";
import { graphql } from "gatsby";
import Nav from "../components/Navigation/Navigation";
import Contact from "../components/ContactForm/ContactForm";
import Footer from "../components/Footer/Footer";
import ProjectList from "../components/ProjectList/ProjectList";
import Fake3DImage from "../components/Fake3DImage/Fake3DImage";
import SEO from "../components/SEO";
import { Helmet } from "react-helmet";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";

export default function Index({ data }) {
  const projects = {
    featured: data.featured.edges,
    other: data.other.edges,
  };

  return (
    <div className="app">
      <SEO />
      <Helmet>
        <link
          rel="preload"
          href="/fonts/PerfectlyNineties-Regular.woff2"
          as="font"
          type="font/woff2"
        />
        <link
          rel="preload"
          href="/fonts/PerfectlyNineties-Italic.woff2"
          as="font"
          type="font/woff2"
        />
      </Helmet>

      <section className="header" id="about">
        <ErrorBoundary>
          <Fake3DImage />
        </ErrorBoundary>

        <div className="info">
          <h1>
            Hi, I'm <i>Malte</i>, <br />
            Web Developer & Student
          </h1>
        </div>
      </section>

      <Nav />

      <section className="projects" id="projects">
        <ProjectList projects={projects.featured} />
        <ProjectList projects={projects.other} />
      </section>

      <h2 className="contact">Contact</h2>

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
