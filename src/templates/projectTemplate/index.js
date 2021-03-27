import React from "react";
import { graphql } from "gatsby";
import Page from "../../components/Page";
import style from "./projectTemplate.module.scss";
import { MDXRenderer } from "gatsby-plugin-mdx"

export default function Template({data}) {
  const { mdx } = data // data.markdownRemark holds your post data
  const { frontmatter, body, excerpt } = mdx;
  const thumbnailUrl = frontmatter?.thumbnail?.publicURL;

  return (
    <Page seo={{title: frontmatter.title, description: excerpt, image: thumbnailUrl}}>
      <article className={style.article}>
        <header>
          <h1>{frontmatter.title}</h1>
          <h2>{frontmatter.date}</h2>
        </header>
        <main>
          {/* <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          /> */}
          <MDXRenderer className="blog-post-content">{body}</MDXRenderer>

        </main>
      </article>
    </Page>
  )
}

//@TODO: figure out where $path gets info from, maybe from this.node ...?
export const pageQuery = graphql`
  query($path: String!) {
    mdx(frontmatter: { path: { eq: $path } }) {
      body
      excerpt(pruneLength: 150, truncate: false)
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