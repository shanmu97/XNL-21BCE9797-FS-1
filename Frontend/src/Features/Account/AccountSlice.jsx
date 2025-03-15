import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import accountService from "./AccountService";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
  account: user? user.user : null,
  transactions: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const createAccount = createAsyncThunk(
  "account/createAccount",
  async (accountData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await accountService.createAccount(accountData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getAccountDetails = createAsyncThunk(
  "account/getAccountDetails",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
if (!token) throw new Error("Unauthorized: No token found");
      return await accountService.getAccountDetails(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateAccountBalance = createAsyncThunk(
  "account/updateAccountBalance",
  async (balance, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await accountService.updateAccountBalance(balance, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    resetAccountState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.account = action.payload.account;
        state.message = action.payload.message;
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAccountDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAccountDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.account = action.payload.account;
        state.transactions = action.payload.transactions;
      })
      .addCase(getAccountDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateAccountBalance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAccountBalance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.account = action.payload;
      })
      .addCase(updateAccountBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetAccountState } = accountSlice.actions;
export default accountSlice.reducer;
