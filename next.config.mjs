/** @type {import('next').NextConfig} */
const apiKey = process.env.DATA_API_KEY;
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/data/:page",
        destination: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=en-US&page=:page&sort_by=popularity.desc`,
      },
      {
        source: "/genres",
        destination: `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en`,
      },
      {
        source: "/movieId",
        destination: `https://api.themoviedb.org/3/movie`,
      },
    ];
  },
};

export default nextConfig;
