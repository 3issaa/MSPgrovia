import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Landing from "./components/Landing/Landing";
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet";
import Portfolio from "./pages/Portfolio";
import Profile from './pages/Profile';
import Settings from './pages/Settings';
let Routing = createBrowserRouter([
  { path: "/", element: <Landing /> },
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "/Home", element: <Dashboard /> },
      { path: "/Wallet", element: <Wallet /> },
      { path: "/Portfolio", element: <Portfolio /> },
      { path: "/Profile", element: <Profile /> },
      { path: "/Settings", element: <Settings /> },
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
