
import React from "react";
import Layout from "../components/layout";
import Metadata from "../components/metadata";

const NotFound = () => {

    return(
		<Layout title="Not found.">
			<p className="fly-text-center">That's a 404.</p>
		</Layout>
	);
};

export default NotFound;

export const Head = () => (
	<Metadata title="not here"/>
);
