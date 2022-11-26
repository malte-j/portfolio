import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Page, { ScrollablePage } from "../../components/Page";
import "./post.scss";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { motion } from "framer-motion";
import BlogPage from "../../components/BlogPage";

export default function Template({ data }) {
  const { mdx } = data;
  const { frontmatter, body, excerpt } = mdx;
  const thumbnailUrl = frontmatter?.thumbnail?.publicURL;
  const image = getImage(frontmatter.thumbnail);

  return (
    <ScrollablePage
      path="/blog"
      seo={{
        title: frontmatter.title,
        description: excerpt,
        image: thumbnailUrl,
      }}
    >
      <article className="blog-article">
        <header className={frontmatter.thumbnail ? "hasThumbnail" : ""}>
          {frontmatter.thumbnail ? (
            <motion.div
              style={{
                maxWidth: "1200px",
                width: "100%",
                aspectRatio: "2/1",
                overflow: "hidden",
              }}
              layoutId={frontmatter.path + "-thumbnail"}
            >
              <GatsbyImage
                className="thumbnail"
                image={image!}
                alt={"preview image"}
              />
            </motion.div>
          ) : undefined}
          <div className="title">
            <motion.h2 layout="position" layoutId={frontmatter.path + "-date"}>
              {frontmatter.date}
            </motion.h2>
            <motion.h1 layoutId={frontmatter.path + "-title"}>
              {frontmatter.title}
            </motion.h1>
          </div>
        </header>
        <motion.main
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          initial={{ opacity: 0 }}
        >
          <MDXRenderer className="blog-post-content">{body}</MDXRenderer>
        </motion.main>
      </article>
    </ScrollablePage>
  );
}

export const pageQuery = graphql`
  query ($path: String!) {
    mdx(frontmatter: { path: { eq: $path } }) {
      body
      excerpt(pruneLength: 150, truncate: false)
      frontmatter {
        title
        date(formatString: "MMMM YYYY", locale: "en")
        path
        thumbnail {
          publicURL
          childImageSharp {
            gatsbyImageData(
              width: 1100
              height: 550
              quality: 90
              layout: CONSTRAINED
              aspectRatio: 2
            )
          }
        }
      }
    }
  }
`;
