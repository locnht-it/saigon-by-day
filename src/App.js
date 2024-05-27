import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import PackageInDay from "./pages/packageInDay/PackageInDay";
import NewUser from "./pages/newuser/NewUser.jsx";
import Single from "./pages/single/Single";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { userInputs, packageInDayInputs } from "./formData.js";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext.js";

const router = createBrowserRouter([
  {
    path: "/",
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
    path: "/users/:userId/new",
    element: <NewUser inputs={userInputs} title={"Add New User"} />,
  },
  {
    path: "/users/:userId",
    element: <Single />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
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
