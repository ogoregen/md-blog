
import * as React from "react"
import {Link, graphql} from "gatsby"
import "normalize.css";
import "../style.css";
import Layout from "../components/layout"
import MetaData from "../components/metadata";
import CONFIG from "../../data/config";

export const query = graphql`
    query{
        allMarkdownRemark(
            filter: { fileAbsolutePath: { regex: "/(posts)/" } },
            sort: { frontmatter: { date: DESC } }
        ){
            nodes {
                frontmatter {
                    title
                    date(formatString: "MMM. D, YYYY")
                    slug
                    description
                }
                id
            }
        }
    }
`;

const Blog = ({data}) => {

    return(
        <Layout>
            {
                data.allMarkdownRemark.nodes.map(node => (
                    <div className="fly-flex fly-flex-space-between fly-margin-bottom" key={node.id}>
                        <div>
                            <Link to={`/${node.frontmatter.slug}`} className="fly-text-lead">{node.frontmatter.title}</Link>
                            <p className="fly-margin-none-top">{node.frontmatter.description}</p>
                        </div>
                        <p className="fly-margin-none-top fly-mobile-only">{node.frontmatter.date}</p>
                    </div>
                ))
            }
        </Layout>
    )
}

export default Blog;

export const Head = () => (
	<MetaData
		title={CONFIG.title}
		description={CONFIG.description}
	/>
);
