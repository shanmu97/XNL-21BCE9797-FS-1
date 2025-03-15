import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import transactionService from "./TransactionService";


export const createTransaction = createAsyncThunk(
  "transaction/create",
  async ({ type, amount }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user?.token;
      if (!token) throw new Error("Unauthorized: Token missing");
      return await transactionService.createTransaction({ type, amount }, token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchTransactions = createAsyncThunk(
  "transaction/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user?.token;
      if (!token) throw new Error("Unauthorized: Token missing");

      return await transactionService.getUserTransactions(token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions.push(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionSlice.reducer;
