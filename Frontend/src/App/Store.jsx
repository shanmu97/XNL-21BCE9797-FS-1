import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/Auth/AuthSlice";
import transactionReducer from "../Features/Transactions/TransactionSlice";
import accountReducer from "../Features/Account/AccountSlice"; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    transaction: transactionReducer,
    account: accountReducer,
  },
});

export default store;
