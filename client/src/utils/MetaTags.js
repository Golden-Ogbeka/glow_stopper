import { Helmet } from 'react-helmet';
import React from 'react';
import BrandImage from '../assets/brand/logo.png';

const hostName = 'https://glowstopper.com';

export default function MetaTags({ title, description, noIndex }) {
	return (
		<Helmet>
			{/* Main Tags  */}
			<title>{title}</title>
			<meta name='title' content={title} />
			<meta name='description' content={description} />

			{/* Google meta tags */}
			<meta itemProp='name' content={title} />
			<meta itemProp='description' content={description} />
			<meta itemProp='image' content={hostName + BrandImage} />

			{/* Facebook meta tags */}
			<meta property='og:url' content={hostName + window.location.pathname} />
			<meta property='og:type' content='website' />
			<meta property='og:title' content={title} />
			<meta property='og:description' content={description} />

			{/* Twitter meta tags  */}
			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:title' content={title} />
			<meta name='twitter:description' content={description} />

			{/* No index */}
			{noIndex === true && <meta name='robots' content='noIndex' />}
		</Helmet>
	);
}
