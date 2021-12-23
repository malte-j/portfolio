module.exports = {
  siteMetadata: {
    title: "Malte Janßen",
    description:
      "Website und Portfolio von Malte Janßen, Webentwickler und Student.",
    url: "https://malts.me",
    siteUrl: "https://malts.me",
    image: "/sharing.png",
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: "./static",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: "./content/projects",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: "./content/posts",
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: `Malte`,
        short_name: `Malte`,
        orientation: `portrait`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#000000`,
        lang: `de-DE`,
        display: `standalone`,
        icon: `static/favicon.png`,
        cache_busting_mode: "none",
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        commonmark: true,
        // "excerpt_separator": `!--`,
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
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
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    "gatsby-plugin-mdx-source-name",
    {
      resolve: "gatsby-plugin-anchor-links",
      options: {
        offset: -100,
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
  ],
};
