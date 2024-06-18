import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState} from "./store"

export interface PurchaseState {
  orderId: string;
  planId: string | undefined;
}


const initialState: PurchaseState = {
  orderId: localStorage.getItem("orderId") || "",
  planId: localStorage.getItem("planId") || ""
}

export const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setPurchaseData: (state, action: PayloadAction<{orderId: string, planId: string | undefined}>) => {
      state.orderId = action.payload.orderId
      state.planId = action.payload.planId
      localStorage.setItem("orderId", action.payload.orderId)
      localStorage.setItem("planId", action.payload.planId || "")
    },
  },
})

export const { setPurchaseData } = purchaseSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectOrderId = (state: RootState) => state.purchase.orderId
export const selectPlanId = (state: RootState) => state.purchase.planId


export default purchaseSlice.reducer
