import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Landing from "./components/Landing/Landing";
import Dashboard from "./pages/Dashboard";
let Routing = createBrowserRouter([
  { path: "/", element: <Landing /> },
  {
    path: "",
    element: <Layout />,
    children: [{ path: "/Home", element: <Dashboard /> }],
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
