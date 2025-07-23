
import React from "react";

const Metadata = ({title, description, children}) => {

	return(
        <>
            <html lang="en"/>
            <title>{title}</title>
            <meta name="description" content={description}/>
            {children}
        </>
	);
};

export default Metadata;
