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
import { NewQuestionPage} from "./features/adminPage/questionsPage/newQuestionPage/NewQuestionPage"
import { LinkSent } from "./features/authProblem/linkSent/LinkSent"
import { AdminLayout } from "./features/layouts/adminLayout/AdminLayout"
import { AuthLayout } from "./features/layouts/authLayout/AuthLayout"
import { UserLayout } from "./features/layouts/userLayout/UserLayout"
import { GameResults } from "./features/gameResults/GameResults"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App />
    ),
  },






  {
    path: "auth",
    element: <AuthLayout/>,

    children: [
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
        path: "forgot_password/link_sent",
        element: <LinkSent/>,
      },
    ],
  },

  {
    path: "user_page",
    element: <UserLayout/>,

    children: [
      {
        element: <UserPage/>,
        index: true
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
        path: "plan_users",
        element: <PlanUsersPage/>,
      },
      {
        path: "profile/link_sent",
        element: <LinkSent/>,
      },

    ],
  },

  {
    path: "admin",
    element: <AdminLayout/>,

    children: [
      {
        element: <AdminPage/>,
        index: true
      },
      {
        path: "users_page",
        element: <UsersPage />,
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
        path: "questions_page/add_question",
        element: <NewQuestionPage/>,
      },
    ],
  },
  {
    path: "user_page/game_results",
    element: <GameResults/>,
  },



  


]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
