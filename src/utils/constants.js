export const logo =
  "https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAchJje9GUBJ_ehbO0uOApH8QmRyuvK0LQI9obzFeGtfkpfLyh4FdolMZR4PtvyNoOomDcY7BzTbhFC3gJinH0UadYBg807AKDSPyfsUDm9T3CZKn9OSZN3II7060MZESFcb6YOS9jvzh.svg";

export const userDefaultPhoto =
  "https://occ-0-3216-2186.1.nflxso.net/dnm/api/v6/SO2HoVCx33X8phZh2pZZmQ4QgNY/AAAABWdoQDrgD7cokEYrF-FVdgfoil5wiBMg6j3GeUjYY_av6C64opFSXOsJ5U8EF02G6SB6b4zUw4MSG6EtpQu8gUBg1Y5Bgs4.png?r=229";

export const backgroundImage =
  "https://assets.nflxext.com/ffe/siteui/vlv3/29195c81-5ebb-453e-82e9-d3a50737dfb3/web/IN-en-20261026-TRIFECTA-perspective_ef561213-292c-4768-aef0-c1db800e385e_large.jpg";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZDFiNmEzZjBmOWJiZTIxZGYxNGIwMjdlOWI1OWQzYSIsIm5iZiI6MTc5MzUwOTg1MS45OTcsInN1YiI6IjZhZTZjOWRiZGJhZGE4MWNmYmYxYThiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JkA9t1YBJiVSWZnCfFGdgmkeDRb7t_8hEi-p8f1o3Nc",
  },
};

// TMDB image base; append a size (w342, w500, original) and the image path
export const IMG_CDN_URL = "https://image.tmdb.org/t/p/";

export const supportedLanguages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "hi", name: "Hindi" },
];

// Groq API key (free tier). Set REACT_APP_GROQ_API_KEY in .env.local, which git ignores.
export const groqApiKey = process.env.REACT_APP_GROQ_API_KEY;
