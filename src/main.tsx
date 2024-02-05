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
import { CreateGame } from "./features/createGame/CreateGame"
import { UserPage } from "./features/userPage/UserPage"
import { AdminPage } from "./features/adminPage/AdminPage"
import { UsersPage } from "./features/adminPage/usersPage/UsersPage"
import { PlanUsersPage } from "./features/planUsers/PlanUsersPage"
import { PlanRequestsPage } from "./features/adminPage/planRequestsPage/PlanRequestsPage"
import { QuestionsPage } from "./features/adminPage/questionsPage/QuestionsPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App />
    ),
  },
  {
    path: "register",
    element: <Registration />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "forgot_password",
    element: <AuthProblem />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "create_game",
    element: <CreateGame />,
  },
  {
    path: "user_page",
    element: <UserPage/>,
  },
  {
    path: "admin_page",
    element: <AdminPage/>,
  },
  {
    path: "users_page",
    element: <UsersPage />,
  },
  {
    path: "plan_users",
    element: <PlanUsersPage/>,
  },
  {
    path: "plan_requests",
    element: <PlanRequestsPage/>,
  },
  {
    path: "questions_page",
    element: <QuestionsPage/>,
  },
  {
    path: "create_game",
    element: <CreateGame/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
