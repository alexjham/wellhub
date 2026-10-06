const { DIETS } = require("./lib/redirects.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    // Old wellhub.com.au addresses, so search traffic and bookmarks keep working.
    const diet = DIETS.flatMap(({ slug, from }) =>
      from.map((source) => ({ source, destination: `/diet/${slug}`, permanent: true })),
    );
    return [
      ...diet,
      { source: "/meals/meal-kits", destination: "/meal-kits", permanent: true },
      { source: "/meals/dairy-free", destination: "/meals", permanent: true },
      { source: "/vitamins", destination: "/supplements", permanent: true },
      { source: "/protein-powder", destination: "/supplements", permanent: true },
      { source: "/greens-powder", destination: "/supplements", permanent: true },
      { source: "/blog", destination: "/guides", permanent: true },
      { source: "/our-story", destination: "/about-us", permanent: true },
      { source: "/brands", destination: "/meals", permanent: false },
    ];
  },
};

module.exports = nextConfig;
