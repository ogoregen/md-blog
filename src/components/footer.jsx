
import React from "react";
import CONFIG from "../../data/config";

const Footer = () => {

	return(
		<footer className="fly-footer fly-text-center fly-margin-bottom">
			<span>{CONFIG.footerText}</span>
			<a href="/rss.xml" target="_blank" className="fly-margin-left">RSS</a>
		</footer>
	);
};

export default Footer;
