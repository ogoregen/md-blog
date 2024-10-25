
import React from "react";
import {Link, graphql, useStaticQuery} from "gatsby";
import CONFIG from "../../data/config";

const Header = () => {

	const data = useStaticQuery(graphql`
		query{
			allMarkdownRemark(
				filter: { fileAbsolutePath: { regex: "/(pages)/" } },
				sort: { frontmatter: { index: ASC } }
			){
				nodes {
					frontmatter {
						title
						slug
					}
					id
				}
			}
		}
	`);

	return(
		<header className="fly-header">
			<Link to="/" className="fly-title">{CONFIG.title}</Link>
			<nav>
				<ul class="fly-nav">
					{ data.allMarkdownRemark.nodes.length > 0 &&
						<li>
							<Link to="/" activeClassName="fly-nav-active">blog</Link>
						</li>
					}
					{
						data.allMarkdownRemark.nodes.map(node => (
							<li>
								<Link to={`/${node.frontmatter.slug}`} activeClassName="fly-nav-active">{node.frontmatter.title}</Link>
							</li>
						))
					}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
