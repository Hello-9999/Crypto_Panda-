import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import dataSlice from "../slice/data.slice";
import favoriteStore from "../slice/AddtoFavorite";
import TransactionDetail from "../slice/Transaction";
import LoginDetails from "../slice/Logindetails";
import Pricealert from "../slice/Pricealert";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  Limited_News: dataSlice,
  Favorite_List: favoriteStore,
  // Transaction_detail: TransactionItem,
  Transaction_List: TransactionDetail,
  Login_Details: LoginDetails,
  Price_Alert : Pricealert
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});
let persistor = persistStore(store);
export default persistor;
