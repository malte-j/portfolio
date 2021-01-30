import React from "react"
import { Helmet } from 'react-helmet-async';
import { useStaticQuery, graphql } from "gatsby"

export default ({title, description, image}) => {

  const { site } = useStaticQuery(query)
  const { siteMetadata:meta } = site

  title = title ?? meta.title;
  description = description ?? meta.description;
  image = image ?? meta.image;

  return(
  <Helmet htmlAttributes={{"lang": "de"}}>
    <title>{title}</title>
    <meta property="og:title" content={title} />
    <meta property="og:type" content="website" />
    <meta property="og:description" content={description} />
    <meta property="og:url" content="https://malts.me" />
    <meta property="og:locale" content="de_DE" />
    <meta property="og:image" content={image} />

    <meta name="description" content={description} />
    <meta name="language" content="DE"/>
    
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital@0;1&family=IBM+Plex+Sans&display=swap" rel="stylesheet"/>
  </Helmet>
)}

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
`