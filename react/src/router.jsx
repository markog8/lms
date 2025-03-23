// 1. Third-party libraries
import { createBrowserRouter, Navigate } from "react-router-dom";
// 2. Local components
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
// 3. Views & Pages
import Dashboard from "./Dashboard.jsx";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import Users from "./views/Users";
import UserForm from "./views/UserForm";
import Leagues from "./views/Leagues.jsx";
import LeagueForm from "./views/LeagueForm.jsx";
import LeagueDetail from "./views/LeagueDetail.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to="/users"/>
      },
      {
        path: '/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/users',
        element: <Users/>
      },

      {
        path: '/users/new',
        element: <UserForm key="userCreate" />
      },
      {
        path: '/users/:id',
        element: <UserForm key="userUpdate" />
      },
      {
        path: '/leagues',
        element: <Leagues/>
      },
      {
        path: '/leagues/new',
        element: <LeagueForm/>
      },
      {
        path: '/leagues/:id',
        element: <LeagueDetail/>
      }

    ]
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <Signup/>
      }
    ]
  },
  {
    path: "*",
    element: <NotFound/>
  }
])

export default router;
