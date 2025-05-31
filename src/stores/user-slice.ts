import { UserProps } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserStateProps {
  isAuthenticated: boolean;
  user: UserProps | null;
}

const initialState: UserStateProps = {
  isAuthenticated: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<UserStateProps["user"]>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    signOut(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer;
