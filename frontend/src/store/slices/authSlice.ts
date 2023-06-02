import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";

export interface AuthState {
  isAuth: boolean;
  user?: Partial<User>;
  token?: string;
}

const initialState: AuthState = {
  isAuth: false,
  user: undefined,
  token: undefined,
};

const mergeUser = (
  user: Partial<User> | undefined,
  partialUser: Partial<User>
): Partial<User> => {
  return { ...user, ...partialUser };
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ user: Partial<User>; token: string }>
    ) => {
      state.isAuth = true;
      state.user = mergeUser(state.user, action.payload.user);
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = undefined;
      state.token = undefined;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
