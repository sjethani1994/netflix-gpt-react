import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: [],
    // Trailer keys by movie id, kept separate so replacing the movie list doesn't wipe them
    videoKeys: {},
  },
  reducers: {
    setNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    setVideoKey: (state, action) => {
      const { movieId, videoKey } = action.payload;
      state.videoKeys[movieId] = videoKey;
    },
  },
});

export const { setNowPlayingMovies, setVideoKey } = movieSlice.actions;
export default movieSlice.reducer;
