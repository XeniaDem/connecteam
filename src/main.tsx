import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./store/store"
import App from "./App"
import "./index.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Registration } from "./features/auth/registration/Registration"
import { Login } from "./features/auth/login/Login"
import { AuthProblem } from "./features/auth/authProblem/AuthProblem"
import { Profile } from "./features/profile/Profile"
import { CreateGame } from "./features/createGame/CreateGame"
import { UserPage } from "./features/userPage/UserPage"
import { AdminPage } from "./features/adminPage/AdminPage"
import { UsersPage } from "./features/adminPage/usersPage/UsersPage"
import { PlanUsersPage } from "./features/profile/planInfo/planUsers/PlanUsersPage"
import { QuestionsPage } from "./features/adminPage/questionsPage/QuestionsPage"
import { NewQuestionPage} from "./features/adminPage/questionsPage/newQuestionPage/NewQuestionPage"
import { LinkSent } from "./features/auth/authProblem/linkSent/LinkSent"
import { AdminLayout } from "./layouts/adminLayout/AdminLayout"
import { AuthLayout } from "./layouts/authLayout/AuthLayout"
import { UserLayout } from "./layouts/userLayout/UserLayout"
import { JoinPlan } from "./features/joinPlan/JoinPlan"
import { JoinGame } from "./features/joinGame/JoinGame"
import { InviteLayout } from "./layouts/inviteLayout/InviteLayout"
import { GamePage } from "./features/gamePage/GamePage"
import { PurchaseResult } from "./features/planList/purchaseResult/PurchaseResult"
import { PageNotFound } from "./features/pageNotFound/PageNotFound"
import { GameResults } from "./features/gameResults/GameResults"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App />
    ),
  },
  {
    path: "*",
    element: (
      <PageNotFound />
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
        path: "link_sent",
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
      {
        path: "game_results",
        element: <GameResults/>,
      },

    ],
  },
  {
    path: "purchase",

    children: [
      {
        path: "plan",
        element: <PurchaseResult />,
      },
      {
        path: "upgrade",
        element: <PurchaseResult />,
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
    path: "invite",
    element: <InviteLayout/>,

    children: [
      {
        path: "plan/:code",
        element: <JoinPlan/>,
        
      },
      {
        path: "game/:code",
        element: <JoinGame/>,
      },
    ],
  },

  {
    path: "game/:gameId",
    element: <GamePage />,
  },
  


]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  // </React.StrictMode>,
)
