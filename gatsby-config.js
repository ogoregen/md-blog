
const CONFIG = require("./data/config.js");

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
	siteMetadata: {
		title: CONFIG.title,
		description: CONFIG.description,
		siteUrl: CONFIG.url,
		author: CONFIG.author,
	},
	plugins: [
		"gatsby-plugin-image",
		"gatsby-plugin-sitemap",
		"gatsby-plugin-sharp",
		"gatsby-transformer-sharp",
		{
			resolve: "gatsby-plugin-manifest",
			options: { icon: "data/favicon.png" },
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
			resolve: "gatsby-plugin-robots-txt",
			options: {
				host: CONFIG.url,
				sitemap: `${CONFIG.url}/sitemap-index.xml`,
			},
		},
		{
			resolve: "gatsby-transformer-remark",
			options: {
				plugins: [
					"gatsby-remark-prismjs",
					{
						resolve: "gatsby-remark-images",
						options: { maxWidth: 1200 },
					},
				],
			},
		},
		{
			resolve: "gatsby-plugin-feed",
			options: {
				feeds: [
					{
						title: CONFIG.title,
						output: "/rss.xml",
						query: `
							{
								allMarkdownRemark(
									filter: { internal: { contentFilePath: { regex: "/(posts)/" } } },
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
						serialize: ({ query: { site, allMarkdownRemark }}) => {
							return allMarkdownRemark.nodes.map(node => {
								const url = site.siteMetadata.siteUrl + '/' + node.frontmatter.slug;
								return {
									title: node.frontmatter.title,
									date: node.frontmatter.date,
									author: site.siteMetadata.author,
									description: node.excerpt,
									url,
									guid: url,
									custom_elements: [{"content:encoded": node.html}],
								};
							});
						},
					},
				],
			},
		},
	],
};
