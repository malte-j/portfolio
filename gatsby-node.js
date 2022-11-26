const path = require(`path`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/Post/index.tsx`);
  const result = await graphql(`
    {
      allMdx(filter: {fields: {source: {eq: "posts"}}, frontmatter: {path: {ne: null}}}, sort: {fields: frontmatter___date, order: DESC}) {
        edges {
          node {
            fileAbsolutePath
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  result.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {
        // path: '/blog' + node.frontmatter.pat
      }, // additional data can be passed via context
    })
  })
}
