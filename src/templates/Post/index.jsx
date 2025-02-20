import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Page from "../../components/Page";
import "./post.scss";
import { MDXRenderer } from "gatsby-plugin-mdx";

export default function Template({ data }) {
  const { mdx } = data;
  const { frontmatter, body, excerpt } = mdx;
  const thumbnailUrl = frontmatter?.thumbnail?.publicURL;
  const metaUrl = frontmatter?.metaImage?.publicURL;
  const image = getImage(frontmatter.thumbnail);

  return (
    <Page
      seo={{
        title: frontmatter.title,
        description: excerpt,
        image: metaUrl ?? thumbnailUrl,
      }}
    >
      <article className="blog-article">
        <header className={frontmatter.thumbnail ? "hasThumbnail" : ""}>
          {frontmatter.thumbnail ? (
            <GatsbyImage
              className="thumbnail"
              image={image}
              alt={"preview image"}
            />
          ) : undefined}
          <div className="title">
            <h2>{frontmatter.date}</h2>
            <h1>{frontmatter.title}</h1>
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
        date(formatString: "MMMM YYYY", locale: "en")
        path
        metaImage {
          publicURL
        }
        thumbnail {
          publicURL
          childImageSharp {
            gatsbyImageData(
              width: 1100
              quality: 90
              formats: [WEBP, JPG]
              webpOptions: { quality: 80 }
            )
          }
        }
      }
    }
  }
`;
