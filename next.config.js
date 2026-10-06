const { redirects } = require("./lib/redirects.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return redirects();
  },
};

module.exports = nextConfig;
