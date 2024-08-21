import { createBrowserRouter } from "react-router-dom";
import { Deposit } from "../pages/private/deposit/Deposit";
import { Market } from "../pages/private/market/Market";
import Meal from "../pages/private/meal/Meal";
import { Summary } from "../pages/private/summary/Summary";
import DashBoard from "../pages/private/dashboard/DashBoard";
import Login from "../pages/public/account/Login";
import Registration from "../pages/public/account/Registration";
import Member from "../pages/private/Member";
import PrivateRoute from "./PrivateRoute";
import Root from "./Root";

export const route = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Root />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <DashBoard />,
      },
      {
        path: "/member",
        element: <Member />,
      },
      {
        path: "/deposit",
        element: <Deposit />,
      },
      {
        path: "/market",
        element: <Market />,
      },
      {
        path: "/meal",
        element: <Meal />,
      },
      {
        path: "/summary",
        element: <Summary />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Registration />,
  },
]);
