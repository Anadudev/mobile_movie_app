export const TMBD_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  try {
    const endpoint = query
      ? `${TMBD_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(
          query
        )}`
      : `${TMBD_CONFIG.BASE_URL}/discover/movie?sort_by=popularity`;
    const response = await fetch(endpoint, {
      method: "GET",
      headers: TMBD_CONFIG.headers,
    });

    if (!response.ok) {
      throw new Error(
        response.statusText || "Failed to fetch movies",
        // @ts-ignore
        response.statusText
      );
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};
