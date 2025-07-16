
import React from "react";

const MetaData = ({title, description, children}) => {

	return(
        <>
            <html lang="en"/>
            <title>{title}</title>
            <meta name="description" content={description}/>
            {children}
        </>
	);
};

export default MetaData;
