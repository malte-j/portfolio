import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

export default function SEO({ title, description, image }: {
  title?: string;
  description?: string;
  image?: string;
}) {
  const { site } = useStaticQuery(query);
  const { siteMetadata: meta } = site;

  title = title ?? meta.title;
  description = description ?? meta.description;
  image = image ?? meta.image;

  return (
    <Helmet htmlAttributes={{ lang: "de" }}>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="de_DE" />
      <meta property="og:image" content={`https://malts.me${image}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`https://malts.me${image}`} />

      <meta name="description" content={description} />
      <meta name="language" content="DE" />
    </Helmet>
  );
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        title
        description
        url
        image
      }
    }
  }
`;
