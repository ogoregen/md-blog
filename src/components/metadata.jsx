
import React from "react";

const Metadata = ({title, description, children}) => {

	return(
        <>
            <html lang="en"/>
            <title>{title}</title>
            <meta name="description" content={description}/>
            <link rel="preconnect" href="https://rsms.me/"/>
            {children}
        </>
	);
};

export default Metadata;
