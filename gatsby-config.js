
const CONFIG = require("./data/config.js");

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
    siteMetadata: {
        title: CONFIG.title,
        description: CONFIG.description,
        siteUrl: CONFIG.url,
    },
    plugins: [
        "gatsby-plugin-image",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        {
            resolve: "gatsby-plugin-feed",
            options: {
                feeds: [
                    {
                        serialize: ({query: {site, allMarkdownRemark}}) => {

                            return allMarkdownRemark.nodes.map(node => {

                                return Object.assign({}, node.frontmatter, {

                                    description: node.excerpt,
                                    date: node.frontmatter.date,
                                    url: site.siteMetadata.siteUrl + '/' + node.frontmatter.slug,
                                    guid: site.siteMetadata.siteUrl + '/' + node.frontmatter.slug,
                                    custom_elements: [{"content:encoded": node.html}],
                                });
                            });
                        },
                        query: `
                            {
                                allMarkdownRemark(
                                    filter: { fileAbsolutePath: { regex: "/(posts)/" } },
                                    sort: { frontmatter: { date: DESC } })
                                {
                                    nodes{
                                        html
                                        excerpt
                                        frontmatter{
                                            slug
                                            title
                                            date(formatString: "MMMM D, YYYY")
                                        }
                                    }
                                }
                            }
                        `,
                        output: "/rss.xml",
                        title: CONFIG.title,
                    },
                ],
            },
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "pages",
                path: `${__dirname}/data/pages/`,
            },
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "posts",
                path: `${__dirname}/data/posts/`,
            },
        },
        {
            resolve: "gatsby-plugin-preconnect",
            options: {
                domains: [
                    "https://rsms.me/",
                ],
            },
        },
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                icon: "data/favicon.png",
            },
        },
        {
            resolve: "gatsby-transformer-remark",
            options: {
                plugins: [
                    {
                        resolve: "gatsby-remark-images",
                        options: {
                            maxWidth: 1200,
                        },
                    },
                    {
                        resolve: "gatsby-remark-prismjs",
                        options: {
                            classPrefix: "language-",
                        },
                    },
                ],
            },
        },
    ]
};
