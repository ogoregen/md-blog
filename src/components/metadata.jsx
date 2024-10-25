
import React from "react";

const MetaData = ({title, description, children}) => {

	return(
        <>
            <title>{title}</title>
            <meta name="description" content={description}/>                        
            {children}
        </>
	);
};

export default MetaData;
