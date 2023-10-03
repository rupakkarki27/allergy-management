import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  isAuthenticated?: boolean;
  token?: string;
}

const initialState: IInitialState = {
  isAuthenticated: false,
  token: "",
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
    },
  },
});

export const { userLogin, updateToken, userLogout } = authSlice.actions;

export default authSlice.reducer;
