
import React from "react";
import Layout from "../components/layout";
import MetaData from "../components/metadata";

const NotFound = () => {

    return(
		<Layout title="Not found.">
			<p className="fly-text-center">That's a 404.</p>
		</Layout>
	);
};

export default NotFound;

export const Head = () => (
	<MetaData title="not here"/>
);
