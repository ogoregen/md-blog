
import React from "react";
import {Link, graphql} from "gatsby"
import "normalize.css";
import "../style.css";
import Layout from "../components/layout"
import Metadata from "../components/metadata";
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

    if(data.allMarkdownRemark.nodes.length === 0){

        return(
            <Layout>
                <p className="fly-text-muted fly-text-center">no posts yet</p>
            </Layout>
        );
    }

    return(
        <Layout>
            {
                data.allMarkdownRemark.nodes.map(node => (
                    <div className="fly-margin-large-bottom" key={node.id}>
                        <div className="fly-flex fly-flex-space-between fly-margin-bottom fly-flex-break-mobile">
                            <div className="fly-margin-right">
                                <Link to={`/${node.frontmatter.slug}`} className="fly-text-lead">{node.frontmatter.title}</Link>
                                <p className="fly-margin-none">{node.frontmatter.description}</p>
                            </div>
                            <p className="fly-margin-none fly-text-muted" style={{flexShrink: 0}}>{node.frontmatter.date}</p>
                        </div>
                    </div>
                ))
            }
        </Layout>
    )
}

export default Blog;

export const Head = () => (
	<Metadata
		title={CONFIG.title}
		description={CONFIG.description}
	/>
);
