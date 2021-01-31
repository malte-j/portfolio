import React from "react";
import { graphql } from "gatsby";
import Page from "../../components/Page";
import style from "./projectTemplate.module.scss";

export default function Template({data}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html, excerpt } = markdownRemark;
  const thumbnailUrl = frontmatter?.thumbnail?.publicURL;

  return (
    <Page seo={{title: frontmatter.title, description: excerpt, image: thumbnailUrl}}>
      <article className={style.article}>
        <header>
          <h1>{frontmatter.title}</h1>
          <h2>{frontmatter.date}</h2>
        </header>
        <main>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </main>
      </article>
    </Page>
  )
}

//@TODO: figure out where $path gets info from, maybe from this.node ...?
export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      excerpt(format: PLAIN, pruneLength: 150, truncate: false)
      frontmatter {
        title
        date(formatString: "MMMM YYYY")
        path
        thumbnail {
          publicURL
        }
      }
    }
  }
`