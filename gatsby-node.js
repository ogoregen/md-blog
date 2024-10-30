
exports.createSchemaCustomization = ({actions}) => {

	const {createTypes} = actions;

	createTypes(`

		type MarkdownRemark implements Node{
			frontmatter: Frontmatter
		}

		type Frontmatter{
			title: String!
			slug: String!
			description: String!
			date: Date @dateformat
			navIndex: Int
		}
	`);
  };