import { createSlice } from "@reduxjs/toolkit";

interface User {
  username: string | undefined;
  token: string | undefined;
}

const initialState = {
  username: undefined,
  token: undefined,
} as User;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin(state, action) {
      state.username = action.payload.username;
      state.token = action.payload.token;
    },

    userLogout(state) {
      state.username = undefined;
      state.token = undefined;
    },
  },
});

export const { userLogin, userLogout } = userSlice.actions;
export const selectUser = (state: any) => state.user;
export const selectIsLoggedIn = (state: any) => state.user.username !== undefined;
export default userSlice.reducer;
