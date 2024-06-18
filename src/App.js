import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import PackageInDay from "./pages/packageInDay/PackageInDay";
import NewUser from "./pages/newuser/NewUser.jsx";
import Single from "./pages/single/Single";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register.jsx";
import { userInputs, packageInDayInputs } from "./formData.js";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext.js";
import ForgotPassword from "./pages/forgotpassword/ForgotPassword.jsx";
import Package from "./pages/package/Package.jsx";
import PackageInDestination from "./pages/packageindestination/PackageInDestination.jsx";
import Destination from "./pages/destination/Destination.jsx";
import Service from "./pages/service/Service.jsx";
import Order from "./pages/order/Order.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/packageInDays",
    element: <PackageInDay />,
  },
  {
    path: "/packageInDays/:packageInDayId/new",
    element: (
      <NewUser inputs={packageInDayInputs} title={"Add New Package In Day"} />
    ),
  },
  {
    path: "/packages",
    element: <Package />,
  },
  {
    path: "/packageInDestinations",
    element: <PackageInDestination />,
  },
  {
    path: "/destinations",
    element: <Destination />,
  },
  {
    path: "/services",
    element: <Service />,
  },
  {
    path: "/orders",
    element: <Order />,
  },
  {
    path: "/users/:userId/new",
    element: <NewUser inputs={userInputs} title={"Add New User"} />,
  },
  {
    path: "/users/:userId",
    element: <Single />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
  },
]);

function App() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
