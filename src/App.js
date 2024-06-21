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
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext.js";
import ForgotPassword from "./pages/forgotpassword/ForgotPassword.jsx";
import Package from "./pages/package/Package.jsx";
import PackageInDestination from "./pages/packageindestination/PackageInDestination.jsx";
import Destination from "./pages/destination/Destination.jsx";
import Service from "./pages/service/Service.jsx";
import Order from "./pages/order/Order.jsx";
import { jwtDecode } from "jwt-decode";
import { userJwtPayload } from "./entity/UserJwtPayload.jsx";
import { getAuthToken } from "./api/userApi.js";
import { UserProvider } from "./app/userContext.js";
import City from "./pages/city/City.jsx";

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
  {
    path: "/city",
    element: <City />,
  },
]);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("user");

  useEffect(() => {
    let token = getAuthToken();
    if (token !== null) {
      setIsAuthenticated(true);
      const decoded = jwtDecode < userJwtPayload > token;
      setRole(decoded.role);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const { darkMode } = useContext(DarkModeContext);
  return (
    <UserProvider>
      <div className={darkMode ? "app dark" : "app"}>
        <RouterProvider router={router}>
          {!isAuthenticated && <Login />}
        </RouterProvider>
      </div>
    </UserProvider>
  );
}

export default App;
