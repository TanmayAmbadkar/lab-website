const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://neurosymbolic.cis.upenn.edu'; // Update with actual domain

const routes = [
    { path: '/', priority: 1.0, changefreq: 'weekly' },
    { path: '/people', priority: 0.8, changefreq: 'monthly' },
    { path: '/research', priority: 0.9, changefreq: 'monthly' },
    { path: '/publications', priority: 0.9, changefreq: 'weekly' },
    { path: '/news', priority: 0.8, changefreq: 'weekly' },
    { path: '/contact', priority: 0.5, changefreq: 'yearly' },
];

const generateSitemap = () => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemap);
    console.log(`Sitemap generated at ${sitemapPath}`);
};

generateSitemap();
