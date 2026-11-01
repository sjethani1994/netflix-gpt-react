import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    searchResults: [],
    isGPTSearchOpen: false,
  },
  reducers: {
    toggleGPTSearch: (state) => {
      state.isGPTSearchOpen = !state.isGPTSearchOpen;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});

export const { toggleGPTSearch, setSearchResults } = gptSlice.actions;
export default gptSlice.reducer;
