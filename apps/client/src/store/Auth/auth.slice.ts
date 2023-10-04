import { IUser } from "@allergy-management/models";
import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  isAuthenticated?: boolean;
  token?: string;
  user?: IUser;
}

const initialState: IInitialState = {
  isAuthenticated: false,
  token: "",
  user: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogin: (
      state: Draft<IInitialState>,
      action: PayloadAction<IInitialState>
    ) => {
      state.isAuthenticated =
        action.payload?.isAuthenticated || state.isAuthenticated;
      state.token = action.payload?.token || state.token;
      state.user = action.payload?.user || undefined;
    },
    updateToken: (
      state: Draft<IInitialState>,
      action: PayloadAction<IInitialState>
    ) => {
      state.token = action.payload?.token;
    },
    userLogout: (state: Draft<IInitialState>) => {
      state.isAuthenticated = initialState.isAuthenticated;
      state.token = initialState.token;
      state.user = initialState.user;
    },
  },
});

export const { userLogin, updateToken, userLogout } = authSlice.actions;

export default authSlice.reducer;
