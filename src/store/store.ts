import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import gameReducer from "./gameSlice"
import purchaseSlice from "./purchaseSlice"
import notificationsSlice from "./notificationsSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    game: gameReducer,
    purchase: purchaseSlice,
    notifications: notificationsSlice
  },
  
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
