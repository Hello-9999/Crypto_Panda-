import { createSlice } from "@reduxjs/toolkit";

export const Limited_News = createSlice({
  name: "LimitedNews",
  initialState:{
    news : ''
  },
  reducers: {
    CoinLatestNews: (state , action) => {
      state.news = action.payload
      console.log(state.news,'wer')
    },
  },
});

export const {CoinLatestNews}=Limited_News.actions
export default Limited_News.reducer