
import React from "react";
import Footer from "./footer";
import Header from "./header";

const Layout = ({title, subtitle, children}) => {

	if(subtitle){
		var subtitleElement = <span className="fly-text-muted">{subtitle}</span>;
	}

	return(
		<div className="fly-container" style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between',  minHeight: '100vh'}}>
			<div style={{padding: '1rem'}}>
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
