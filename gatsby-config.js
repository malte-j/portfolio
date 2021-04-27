/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "Malte Janßen",
    description: "Website und Portfolio von Malte Janßen, Webentwickler und Student.",
    url: "https://malts.me",
    image: "/sharing.png",
  },
  flags: {
    'DEV_SSR': false
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: './static',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: './content/projects',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: './content/posts',
      },
    },
    {
      "resolve": `gatsby-plugin-mdx`,
      "options": {
        "commonmark": true,
        "excerpt_separator": `!--`,
        "extensions": [`.md`, `.mdx`],
        "gatsbyRemarkPlugins": [
          {
            "resolve": `gatsby-remark-images`,
            "options": {
              "maxWidth": 720,
              "quality": 80,
              "withWebp": true,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              // This separator is a string and will do no white-space
              // stripping.
              // A suggested value for English speakers is the non-ascii
              // character '›'.
              // inlineCodeMarker: null,

              // This toggles the display of line numbers globally alongside the code.
              // To use it, add the following line in src/layouts/index.js
              // right after importing the prism color scheme:
              //  `require("prismjs/plugins/line-numbers/prism-line-numbers.css");`
              // Defaults to false.
              // If you wish to only show line numbers on certain code blocks,
              // leave false and use the {numberLines: true} syntax below
              // showLineNumbers: false,
              // If setting this to true, the parser won't handle and highlight inline
              // code used in markdown i.e. single backtick code like `this`.
              noInlineHighlight: false,
              // This adds a new language definition to Prism or extend an already
              // existing language definition. More details on this option can be
              // found under the header "Add new language definition or extend an
              // existing language" below.
              
              // prompt: {
              //   user: "root",
              //   host: "localhost",
              // },
            },
          },
        ],
      }
    },
    "gatsby-plugin-mdx-source-name",
    {
      resolve: "gatsby-plugin-anchor-links",
      options: {
        offset: -100
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet-async`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Malte`,
        short_name: `Malte`,
        orientation: `portrait`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#000000`,
        lang:`de-DE`,
        display: `standalone`,
        icon: `static/favicon.png`,
        cache_busting_mode: 'none',
      },
    },
  ],
}