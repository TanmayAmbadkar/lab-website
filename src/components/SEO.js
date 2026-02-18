import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url, type = 'website' }) => {
    const siteName = 'Neurosymbolic Lab @ PennState';
    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    const defaultDescription = 'Research in Deep Learning, Formal Methods, and Program Synthesis at the Neurosymbolic Lab, PennState.';
    const metaDescription = description || defaultDescription;
    const siteUrl = 'https://neurosymbolic.cis.upenn.edu'; // Placeholder, should be updated with actual domain
    const fullUrl = url ? `${siteUrl}${url}` : siteUrl;

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            {image && <meta property="og:image" content={image} />}
            <meta property="og:site_name" content={siteName} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={fullUrl} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            {image && <meta name="twitter:image" content={image} />}
        </Helmet>
    );
};

export default SEO;
