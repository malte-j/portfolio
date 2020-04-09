import React from "react"
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from "gatsby"

export default () => {
  
  const { site } = useStaticQuery(query)
  const { siteMetadata:meta } = site
  return(
  <Helmet htmlAttributes={{"lang": "de"}}>
    <title>{meta.title}</title>
    <meta property="og:title" content={meta.title} />
    <meta property="og:url" content="https://malts.me" />

    <meta name="description" content={meta.description} />
    <meta property="og:description" content={meta.description} />
    
    <meta property="og:type" content="website" />

    <meta name="language" content="DE"/>
    <meta property="og:locale" content="de_DE" />

    <meta property="og:image" content={meta.image} />
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital@0;1&display=swap" rel="stylesheet"/>


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