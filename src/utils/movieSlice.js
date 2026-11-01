import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: [],
    // Trailer keys by movie id, kept separate so replacing the movie list doesn't wipe them
    videoKeys: {},
    // Movie shown in the hero; null means the first now-playing movie
    selectedMovie: null,
  },
  reducers: {
    setNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    setVideoKey: (state, action) => {
      const { movieId, videoKey } = action.payload;
      state.videoKeys[movieId] = videoKey;
    },
    setPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
  },
});

export const {
  setNowPlayingMovies,
  setVideoKey,
  setPopularMovies,
  setSelectedMovie,
} = movieSlice.actions;
export default movieSlice.reducer;
