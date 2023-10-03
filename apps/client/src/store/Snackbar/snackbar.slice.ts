import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  showSnackBar?: boolean;
  message?: string;
  type: "error" | "success";
}

const initialState: IInitialState = {
  showSnackBar: false,
  message: "",
  type: "error",
};

export const authSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setError: (
      state: Draft<IInitialState>,
      action: PayloadAction<Partial<IInitialState>>
    ) => {
      state.showSnackBar = true;
      state.message = action?.payload?.message;
      state.type = "error";
    },
    setSuccess: (
      state: Draft<IInitialState>,
      action: PayloadAction<Partial<IInitialState>>
    ) => {
      state.showSnackBar = true;
      state.message = action?.payload?.message;
      state.type = "success";
    },
    hideSnackbar: (state: Draft<IInitialState>) => {
      state.showSnackBar = false;
    },
  },
});

export const { setError, setSuccess, hideSnackbar } = authSlice.actions;

export default authSlice.reducer;
