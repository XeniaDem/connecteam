import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState} from "./store"

export type Access = "super_admin" | "admin" | "user" | ""
export interface AuthState {
  token: string;
  access: Access;
  userId: string;
}


const initialState: AuthState = {
  token: localStorage.getItem("token") || "",
  access: localStorage.getItem("access") as Access || "",
  userId: localStorage.getItem("userId") || ""
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    signIn: (state, action: PayloadAction<{token: string, access: Access, userId: string}>) => {
      state.token = action.payload.token
      state.access = action.payload.access
      state.userId = action.payload.userId
      localStorage.setItem("token", action.payload.token)
      localStorage.setItem("access", action.payload.access)
      localStorage.setItem("userId", action.payload.userId)
    },
  },
})

export const { signIn } = authSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectToken = (state: RootState) => state.auth.token
export const selectAccess = (state: RootState) => state.auth.access
export const selectId = (state: RootState) => state.auth.userId


export default authSlice.reducer
