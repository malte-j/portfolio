import React from "react";

import Page from "../components/Page";
import "prismjs/themes/prism.css";
import * as style from "../styles/blog.module.scss";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ExternalLinkIcon from "../icons/ExternalLink";

import { graphql, Link } from "gatsby";

export default function Blog({ data }) {
  const posts = data.allMdx.edges;

  return (
    <Page seo={{ title: "Blog | Malte Janßen" }}>
      <header className={style.header}>
        <h1>Blog</h1>
        <p>Things I wish someone else would have already written about.</p>
      </header>

      <main className={style.articles}>
        {posts.map(({ node: post }, n) => {
          const { title, date, externalLink, path, thumbnail } =
            post.frontmatter;
          let postDate = <div className={style.date}>{date}</div>;

          if (externalLink) {
            if (externalLink.startsWith("/")) {
              return (
                <Link key={n} to={externalLink} className={style.hasThumbnail}>
                  {postDate}
                  <h2>
                    <ExternalLinkIcon className={style.extLinkIcon} />
                    {title}
                  </h2>
                </Link>
              );
            } else {
              return (
                <a key={n} href={externalLink} className={style.hasThumbnail}>
                  {postDate}
                  <h2>
                    <ExternalLinkIcon className={style.extLinkIcon} />
                    {title}
                  </h2>
                </a>
              );
            }
          } else if (thumbnail) {
            return (
              <Link key={n} to={path}>
                <GatsbyImage
                  image={getImage(thumbnail)!}
                  alt={"preview image"}
                  className={style.thumbnail}
                />
                {postDate}
                <h2>{title}</h2>
              </Link>
            );
          } else {
            return (
              <Link key={n} to={path}>
                {postDate}
                {title}
              </Link>
            );
          }
        })}
      </main>
    </Page>
  );
}

export const pageQuery = graphql`
  query getBlogposts {
    allMdx(
      filter: {
        fields: { source: { eq: "posts" } }
        frontmatter: { unreleased: { ne: true } }
      }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            path
            date(formatString: "DD.MM.YYYY", locale: "de")
            thumbnail {
              childImageSharp {
                gatsbyImageData(
                  width: 600
                  quality: 80
                  avifOptions: { quality: 70 }
                  formats: [AVIF, WEBP, JPG]
                  webpOptions: { quality: 80 }
                )
              }
            }
            externalLink
          }
        }
      }
    }
  }
`;
