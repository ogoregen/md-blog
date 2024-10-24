
/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {

    plugins: [

        "gatsby-plugin-image",
        "gatsby-plugin-sharp",
        `gatsby-transformer-sharp`,
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "blog-posts",
                path: `${__dirname}/blog-posts`,
            },
        },
        {
            resolve: "gatsby-plugin-preconnect",
            options: {
                domains: [
                    {domain: "https://rsms.me/", crossOrigin: false},
                ],
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                icon: "md-blog-config/favicon.png",
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
