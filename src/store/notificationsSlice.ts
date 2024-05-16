import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState} from "./store"

export interface NotificationsState {
  notificationsCount: number
}


const initialState: NotificationsState = {
  notificationsCount: Number.parseInt(localStorage.getItem("notificationsCount") || "") || 0,
}

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateNotifications: (state, action: PayloadAction<{notificationsCount: number}>) => {
      state.notificationsCount = action.payload.notificationsCount
      localStorage.setItem("notificationsCount", action.payload.notificationsCount.toString())
    },
  },
})

export const { updateNotifications } = notificationsSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectNotifications = (state: RootState) => state.notifications.notificationsCount

export default notificationsSlice.reducer
