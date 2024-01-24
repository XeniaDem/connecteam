import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from "./App"
import "./index.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Registration } from "./features/registration/Registration"
import { Login } from "./features/login/Login"
import { AuthProblem } from "./features/authProblem/AuthProblem"
import { Profile } from "./features/profile/Profile"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App />
    ),
  },
  {
    path: "register",
    element: <Registration/>,
  },
  {
    path: "login",
    element: <Login/>,
  },
  {
    path: "forgot_password",
    element: <AuthProblem/>,
  },
  {
    path: "profile",
    element: <Profile/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
