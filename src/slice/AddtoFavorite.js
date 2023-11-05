import { createSlice } from "@reduxjs/toolkit";

export const favoriteStore = createSlice({
  name: "favorite",
  initialState: {
    favlist: [],
  },
  reducers: {
    favoriteList: (state, data) => {
      const favorateData = data.payload;

      const DuplicateData = state.favlist.find((x) => {
        return x.uuid === favorateData.uuid;
      });

      console.log(DuplicateData, "fav");

      if (DuplicateData) {
        state.favlist = state.favlist.map((as) => {
          console.log(as.uuid, "as");
          return as.uuid === favorateData.uuid ? favorateData : as;
        });

        console.log("coin  is already in your fav ;ist  !");
        // console.log(typeof DuplicateData);
      } else {
        state.favlist = [...state.favlist, favorateData];
        console.log("Coin has bee added in your fav list");
      }
    },

    removeitem: (state, id) => {
      console.log(state.favlist, "list");
      console.log(id, "id");
      state.favlist = state.favlist.filter((del) => {
        return del.uuid !== id.payload;
      });
    },
    // TransactionItem: (state, data) => {
    //   const TransactionDetail = data.payload;
    //   console.log(TransactionDetail)

    //   // console.log(state.favlist)
    // },
  },
});
export const { favoriteList, removeitem } = favoriteStore.actions;
export default favoriteStore.reducer;
