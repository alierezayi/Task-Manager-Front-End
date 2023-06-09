import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import userAPI from "@/services/userAPI";

const initialState = {
  pending: false,
  user: {},
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (token, { rejectWithValue }) => {
    try {
      const response = await userAPI.fetchUser(token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.pending = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.pending = false;

        state.user = action.payload.user;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.pending = false;
      });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
