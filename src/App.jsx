import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Landing from "./components/Landing/Landing";
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet";
import Opportunities from "./pages/Opportunities";
import Portfolio from "./pages/Portfolio";
import Discover from "./pages/Discover";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Market from "./pages/Market";
import Assessment from "./pages/Assessment";
import ProtectedRoute from "./components/auth/ProtectedRoute";
let Routing = createBrowserRouter([
  { path: "/", element: <Landing /> },
  {
    path: "",
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          { path: "/Home", element: <Dashboard /> },
          { path: "/Market", element: <Market /> },
          { path: "/Discover", element: <Discover /> },
          { path: "/Opportunities", element: <Opportunities /> },
          { path: "/Wallet", element: <Wallet /> },
          { path: "/Portfolio", element: <Portfolio /> },
          { path: "/Profile", element: <Profile /> },
          { path: "/Settings", element: <Settings /> },
          { path: "/Assessment", element: <Assessment /> },
        ],
      },
    ],
  },
  { path: "Register", element: <Register /> },
  { path: "Login", element: <Login /> },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={Routing}></RouterProvider>
    </>
  );
}
