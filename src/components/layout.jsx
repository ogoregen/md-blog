
import React from "react";
import Header from "./header";
import Footer from "./footer";

const Layout = ({title, subtitle, children}) => {

	if(subtitle){
		var subtitleElement = <span className="fly-text-muted">{subtitle}</span>;
	}

	return(
		<div className="fly-container fly-full-height fly-flex fly-flex-column fly-flex-space-between">
			<div className="fly-padding">
				<main className="fly-width-2-3 fly-margin-horizontal-auto">
					<Header/>
					<div className="fly-text-center">
						<h1 className="fly-margin-small-bottom">{title}</h1>
						{subtitleElement}
					</div>
					<div className="fly-margin-large-top">
						{children}
					</div>
				</main>
			</div>
			<Footer/>
		</div>
	);
};

export default Layout;
