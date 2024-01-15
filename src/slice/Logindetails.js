import { createSlice } from "@reduxjs/toolkit";

export const LoginDetails = createSlice({
  name: "logindetails",
  initialState: {
    isLoggedin: false,
    LoggedinDetails: [],
  },

  //   {console.log(first)}
  reducers: {
    LoginDataslice: (state, data) => {
      const Details = data.payload;

      console.log(Details);

      if (Details.JWT !== null) {
        state.LoggedinDetails = Details;
        state.isLoggedin = true;
      } else {
      }

      // if (Details.status === "success") {
      //   // state.isLoggedin === true
      //   state.LoggedinDetails = Details.authData;
      //   state.isLoggedin = true;
      // } else {
      // }
    },
  },
});

export const { LoginDataslice } = LoginDetails.actions;
export default LoginDetails.reducer;
