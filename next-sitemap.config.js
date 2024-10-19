// next-sitemap.config.js

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://www.aimike.dev',
    generateRobotsTxt: true, // Generates robots.txt file
    // Optional: Exclude specific paths
    exclude: ['/admin/*'],
    // Optional: Additional options
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 5000,
  };
  