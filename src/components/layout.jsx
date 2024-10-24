
import React from "react";
import {Link} from "gatsby"
import Footer from "./footer";
import "../style.css";
import CONFIG from "../../md-blog-config";

const Layout = ({title, subtitle, children}) => {

	if(subtitle){
		var subtitleElement = <span className="fly-text-muted">{subtitle}</span>;
	}

	return(
		<div className="fly-container" style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between',  minHeight: '100vh'}}>
			<div style={{padding: '1rem'}}>
				<main className="fly-width-2-3 fly-margin-horizontal-auto">
					<div class="fly-margin-bottom"><Link to="/" class="fly-link-text">{CONFIG.title}</Link></div>
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
