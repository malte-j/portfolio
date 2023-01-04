import { graphql, Link, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import * as s from "./BlogRollPreview.module.scss";

export const BlogRollPreview = () => {
  const data = useStaticQuery(graphql`
    query getBlogpostsPreview {
      allMdx(
        limit: 5
        filter: {
          fields: { source: { eq: "posts" } }
          frontmatter: { unreleased: { ne: true } }
        }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            id
            excerpt(pruneLength: 2000)
            frontmatter {
              title
              date(formatString: "MMMM YYYY", locale: "en")
              path
              thumbnail {
                childImageSharp {
                  gatsbyImageData(
                    width: 540
                    height: 270
                    quality: 90
                    formats: [AVIF, WEBP, JPG]
                    transformOptions: { cropFocus: CENTER, fit: COVER }
                    avifOptions: { quality: 70 }
                    webpOptions: { quality: 80 }
                  )
                }
              }
            }
          }
        }
      }
    }
  `);
  const posts = data.allMdx.edges as any[];

  return (
    <div className={s.blogRollPreview}>
      <div className={s.left}>
        {posts.map((post, i) =>
          i % 2 == 0 ? <Post post={post.node} key={post.node.id} /> : null
        )}
      </div>
      <div className={s.right}>
        {posts.map((post, i) =>
          i % 2 == 1 ? <Post post={post.node} key={post.node.id} /> : null
        )}
				<Link className={s.readMoreButton} to="/blog">View All Posts</Link>
      </div>
    </div>
  );
};

function Post({ post }: { post: any }) {
  return post.frontmatter.thumbnail ? (
    <div className={s.postWithImage}>
   
      <GatsbyImage
        className={s.thumbnail}
        image={getImage(post.frontmatter.thumbnail)!}
        alt="thumnail of post"
      />
      <p className={s.date}>{post.frontmatter.date}</p>
      <h3 className={s.title}>{post.frontmatter.title}</h3>
    </div>
  ) : (
    <div className={s.postWithoutImage}>
      <p className={s.date}>{post.frontmatter.date}</p>
      <h3 className={s.title}>{post.frontmatter.title}</h3>
    </div>
  );
}
