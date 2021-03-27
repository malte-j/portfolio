import React from "react";

import Page from "../components/Page";
import "prismjs/themes/prism.css";
import style from '../styles/blog.module.scss';
import Img from "gatsby-image";
import ExternalLink from "../icons/ExternalLink"

import { graphql, Link } from 'gatsby';


export default ({data}) => {
  
  const posts = data.allMdx.edges;

  return (
  <Page seo={{title: "Blog | Malte Janßen"}}>

    <header className={style.header}>
      <p>Hey, das hier ist der Kram, der es nicht auf die erste Seite geschafft hat, mein</p>
      <h1>blog.</h1>
    </header>

    <main className={style.articles}>
      {posts.map(({node: post}, n) => {
        const {title, date, externalLink, path, thumbnail} = post.frontmatter;
        let postDate = (<div key={'d' + n} className={style.date}>{ date }</div>);
        
        if(externalLink) {
          return [postDate, (<a key={n} href={externalLink}><h2><ExternalLink className={style.extLinkIcon}/>{title}</h2></a>)]
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
  </Page>
)}

export const pageQuery = graphql`
  query getBlogposts {
    allMdx(filter: {fields: {source: {eq: "posts"}}}, sort: {fields: frontmatter___date, order: DESC}) {
      edges {
        node {
          frontmatter {
            title
            path
            date(formatString: "DD.MM.YYYY", locale: "de")
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 530, , quality: 90) {
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