import React from "react";
import Nav from "../components/nav";
import Footer from '../components/footer'
import SEO from "../components/SEO";
import style from '../styles/blog.module.scss';
import Img from "gatsby-image";
import { graphql, Link } from 'gatsby';
export default ({data}) => {
  
  const posts = data.allMarkdownRemark.edges;

  return (
  <div className="app" style={{"paddingTop": "3rem"}}>
    <SEO/>
    <Nav/>

    <header className={style.header}>
      <p>Hey, das hier ist der Kram, der es nicht auf die erste Seite geschafft hat, mein</p>
      <h1>blog.</h1>
      {/* <p>Hier sind alle Projekte, die nicht groß oder interessant genug sind, um auf der Vorderseite zu landen.</p> */}
    </header>

    <main className={style.articles}>
      {posts.map(({node: post}, n) => {
        const {title, date, externalLink, path, thumbnail} = post.frontmatter;
        let postDate = (<div key={'d' + n} className={style.date}>{ date }</div>);
        

        if(externalLink) {
          return [postDate, (<a key={n} href={externalLink}><h2>{title}</h2></a>)]
        } else if(thumbnail) {
          return [postDate, (<Link key={n} to={path}>
            <Img className={style.thumbnail} fluid={thumbnail.childImageSharp.fluid} />
            <h2>{title}</h2>
            </Link>)]
        } else {
          return [postDate, (<Link key={n} to={path}>{title}</Link>)]
        }
      })}

    </main>

    <Footer/>
  </div>
)}

export const pageQuery = graphql`
  query getBlogposts {
    allMarkdownRemark(filter: {fields: {sourceInstanceName: {eq: "posts"}}}, sort: {fields: frontmatter___date, order: DESC}) {
      edges {
        node {
          frontmatter {
            title
            path
            date(formatString: "DD.MM.YYYY", locale: "de")
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 530, , quality: 70) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            externalLink
          }
        }
      }
    }
  }
`;