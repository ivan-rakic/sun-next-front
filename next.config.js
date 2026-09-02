const path = require("path");
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
const strapiRemotePattern = strapiUrl
  ? (() => {
      const url = new URL(strapiUrl);
      return {
        protocol: url.protocol.replace(":", ""),
        hostname: url.hostname,
        port: url.port,
        pathname: "/uploads/**",
      };
    })()
  : null;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  reactStrictMode: true,

  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
      {
        protocol: "https",
        hostname: "is1-ssl.mzstatic.com",
      },
      {
        protocol: "https",
        hostname: "*.mzstatic.com",
      },
      {
        protocol: "http",
        hostname: "radiojar-lib.appspot.com",
      },
      {
        protocol: "https",
        hostname: "radiojar-lib.appspot.com",
      },
      ...(strapiRemotePattern ? [strapiRemotePattern] : []),
    ],
  },
};

module.exports = nextConfig;
