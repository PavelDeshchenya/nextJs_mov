/** @type {import('next').NextConfig} */
const apiKey = process.env.DATA_API_KEY;
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/movie/:id",
        destination: `https://api.themoviedb.org/3/movie/:id?language=en-US&api_key=${apiKey}&append_to_response=videos`,
      },
      {
        source: "/genres",
        destination: `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en`,
      },
      {
        source: "/movies/:page/:sorting",
        destination: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=en-US&page=:page&sort_by=:sorting`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/Movies",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/w1280/**",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/w500/**",
      },
    ],
  },
};

export default nextConfig;
