import React from "react"
import Nav from "../components/nav"
import SEO from "../components/SEO"

export default ({data}) => {
  
  const posts = data.allMarkdownRemark.edges;

  return (
  <div className="app" style={{"paddingTop": "2rem"}}>
    <SEO/>
    <Nav/>

    <ul>
      {posts.map(({node: post}, n) => {
        const {title, externalLink} = post.frontmatter;
        //@TODO: Add handlers for post w/o image, with image and external links
        if(externalLink) {
          return (<li key={n}><a href={externalLink}>{title}</a></li>)
        } else {
          return (<li key={n}>{title}</li>)
        }
      })}
    </ul>

    <p>hello there!</p>
  </div>
)}

export const pageQuery = graphql`
  query getBlogposts {
    allMarkdownRemark(filter: {fields: {sourceInstanceName: {eq: "posts"}}}, sort: {fields: frontmatter___date, order: DESC}) {
      edges {
        node {
          frontmatter {
            title
            externalLink
          }
        }
      }
    }
  }
`;