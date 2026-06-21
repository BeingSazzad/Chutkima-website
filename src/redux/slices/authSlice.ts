import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  isGuest: boolean;
  name: string;
  phone: string;
  email: string;
  /** the phone captured at the login step, used by the OTP screen */
  pendingPhone: string;
  location: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isGuest: false,
  name: "Sazzad Chowdhury",
  phone: "",
  email: "sazzad@example.com",
  pendingPhone: "",
  location: "Traffic Chowk, Butwal",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setPendingPhone(state, action: PayloadAction<string>) {
      state.pendingPhone = action.payload;
    },
    loginSuccess(state, action: PayloadAction<{ phone?: string }>) {
      state.isAuthenticated = true;
      state.isGuest = false;
      state.phone = action.payload.phone || state.pendingPhone;
    },
    continueAsGuest(state) {
      state.isGuest = true;
      state.isAuthenticated = false;
    },
    setLocation(state, action: PayloadAction<string>) {
      state.location = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.isGuest = false;
      state.phone = "";
      state.pendingPhone = "";
    },
  },
});

export const { setPendingPhone, loginSuccess, continueAsGuest, setLocation, logout } =
  authSlice.actions;

export default authSlice.reducer;
