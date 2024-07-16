import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import Single from "./pages/single/Single";
import Login from "./pages/login/Login";
import "./style/dark.scss";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext.js";
import ForgotPassword from "./pages/forgotpassword/ForgotPassword.jsx";
import Package from "./pages/package/Package.jsx";
import Destination from "./pages/destination/Destination.jsx";
import Service from "./pages/service/Service.jsx";
import Order from "./pages/order/Order.jsx";
import jwtDecode from "jwt-decode";
import { getAuthToken } from "./api/userApi.js";
import City from "./pages/city/City.jsx";
import CityComponent from "./components/citytable/CityComponent.jsx";
import DestinationComponent from "./components/destinationtable/DestinationComponent.jsx";
import ServiceComponent from "./components/servicetable/ServiceComponent.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import PackageComponent from "./components/packageTable/PackageComponent.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import PackageInDay from "./pages/packageInDay/PackageInDay.jsx";
import PackageInDayComponent from "./components/packageInDayTable/PackageInDayComponent.jsx";
import UserComponent from "./components/usertable/UserComponent.jsx";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <BrowserRouter>
      <div className={darkMode ? "app dark" : "app"}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Single />} />

            <Route path="/city" element={<City />} />
            <Route path="/city/save" element={<CityComponent />} />
            <Route path="/city/update/:id" element={<CityComponent />} />

            <Route path="/destination" element={<Destination />} />
            <Route
              path="/destination/save"
              element={<DestinationComponent />}
            />
            <Route
              path="/destination/update/:id"
              element={<DestinationComponent />}
            />

            <Route path="/service" element={<Service />} />
            <Route path="/service/save" element={<ServiceComponent />} />
            <Route path="/service/update/:id" element={<ServiceComponent />} />

            <Route path="/package" element={<Package />} />
            <Route path="/package/save" element={<PackageComponent />} />
            <Route path="/package/update/:id" element={<PackageComponent />} />

            <Route path="/package-in-day" element={<PackageInDay />} />
            <Route
              path="/package-in-day/save"
              element={<PackageInDayComponent />}
            />
            <Route
              path="/package-in-day/update/:id"
              element={<PackageInDayComponent />}
            />

            <Route path="/user" element={<Users />} />
            <Route path="/user/profile/:id" element={<UserComponent />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
