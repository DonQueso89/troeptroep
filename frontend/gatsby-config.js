require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: "TROEPTROEP",
  },
  plugins: [
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: process.env.GATSBY_DATOCMS_READ_KEY,

        // If you are working on development/staging environment, you might want to
        // preview the latest version of records instead of the published one:
        previewMode: false,

        // Disable automatic reloading of content when some change occurs on DatoCMS:
        disableLiveReload: true,

        // Custom API base URL (most don't need this)
        // apiUrl: 'https://site-api.datocms.com',

        // Setup locale fallbacks
        // In this example, if some field value is missing in Italian, fall back to English
        //localeFallbacks: {
        //  it: ["en"],
        //},
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
  ],
};
