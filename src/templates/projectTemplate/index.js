import React from "react";
import { graphql } from "gatsby";
import Page from "../../components/Page";
import style from "./projectTemplate.module.scss";

//@TODO: Code single blogpost layout
export default function Template({data}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <Page seo={{title: frontmatter.title}}>
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
      frontmatter {
        date(formatString: "MMMM YYYY")
        path
        title
      }
    }
  }
`