import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Page from "../../components/Page";
import "./post.scss";
import { MDXRenderer } from "gatsby-plugin-mdx";
import {motion} from 'framer-motion'

export default function Template({ data }) {
  const { mdx } = data;
  const { frontmatter, body, excerpt } = mdx;
  const thumbnailUrl = frontmatter?.thumbnail?.publicURL;
  const image = getImage(frontmatter.thumbnail);

  return (
    <Page
      seo={{
        title: frontmatter.title,
        description: excerpt,
        image: thumbnailUrl,
      }}
    >
      <article className="blog-article">
        <header className={frontmatter.thumbnail ? "hasThumbnail" : ""}>
          {frontmatter.thumbnail ? (
            <motion.div layoutId={frontmatter.path + "-thumbnail"}>
            <GatsbyImage
              className="thumbnail"
              image={image}
              alt={"preview image"}
            /></motion.div>
          ) : undefined}
          <div className="title">
            <h2>{frontmatter.date}</h2>
            <motion.h1 layoutId={frontmatter.path + "-title"}>{frontmatter.title}</motion.h1>
          </div>
        </header>
        <main>
          <MDXRenderer className="blog-post-content">{body}</MDXRenderer>
        </main>
      </article>
    </Page>
  );
}

export const pageQuery = graphql`
  query ($path: String!) {
    mdx(frontmatter: { path: { eq: $path } }) {
      body
      excerpt(pruneLength: 150, truncate: false)
      frontmatter {
        title
        date(formatString: "MMMM YYYY", locale: "de")
        path
        thumbnail {
          publicURL
          childImageSharp {
            gatsbyImageData(width: 1100, quality: 90)
          }
        }
      }
    }
  }
`;
