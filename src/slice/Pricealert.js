import { createSlice } from "@reduxjs/toolkit";

const PricealertStore = createSlice({
  name: "PriceAlertStore",
  initialState: {
    AlertDetails: [],
  },
  reducers: {
    handlePricealert: (state, data) => {
      const alertdata = data.payload;
      console.log(alertdata, "alerdata");
      state.AlertDetails = [...state.AlertDetails, alertdata];

      // const Duplicata = state.AlertDetails.find((check) => {
      //   return check.id === alertdata.id;
      // });
      // console.log(Duplicata)

      // // console.log( !typeof , "dui");

      // // console.log(checkDuplicate ,'dupliucate')
      // if (Duplicata) {
      //   state.AlertDetails = state.AlertDetails.map((check) => {
      //     console.log(check ,'check')
      //     return check.id === alertdata.id ? alertdata : check;
      //   });
      // } else {
      //   state.AlertDetails = [...state.AlertDetails, alertdata];
      // }
    },

    handleDeletePricealert: (state, data) => {
      const id = data.payload;

      state.AlertDetails = state.AlertDetails.filter((del) => {
        return del.delid !== id.delid;
      });

      // console.log(data.payload ,'handledeleet')
      // alert('ui')
    },
  },
});

export const { handlePricealert, handleDeletePricealert } =
  PricealertStore.actions;
export default PricealertStore.reducer;
