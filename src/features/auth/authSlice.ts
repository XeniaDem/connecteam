import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState} from "../../app/store"

export interface AuthState {
  token: string;
}

const initialState: AuthState = {
  token: localStorage.getItem("token") || ""
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      localStorage.setItem("token", action.payload)
    },



  },


})

export const { setToken } = authSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectToken = (state: RootState) => state.auth.token


export default authSlice.reducer
