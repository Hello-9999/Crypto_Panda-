import { createSlice } from "@reduxjs/toolkit";

export const TransactionDetail = createSlice({
  name: "Transaction Detail",
  initialState: {
    TransactionList: [],
  },
  reducers: {
    Transaction_List: (state, data) => {
      const TransactionData = data.payload;

      const DuplicateData = state.TransactionList.find((check) => {
        return (
          check.Type, check.uuid === TransactionData.Type, TransactionData.uuid
        );
      });

      if (DuplicateData) {
        state.TransactionList = state.TransactionList.map((DuplicateTrue) => {
          return (
            DuplicateTrue.Type &&
            DuplicateTrue.detail.uuid === TransactionData.Type &&
            TransactionData.detail.uuid
          );
        });
      } else {
        state.TransactionList = [...state.TransactionList, TransactionData];
      }
    },
  },
});

export const { Transaction_List } = TransactionDetail.actions;
export default TransactionDetail.reducer;
