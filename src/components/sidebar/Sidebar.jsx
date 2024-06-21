import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import "./sidebar.scss";
import {
  CreditCardOutlined,
  DiamondOutlined,
  DnsOutlined,
  ExitToAppOutlined,
  InsertChartOutlinedSharp,
  LocalGroceryStoreOutlined,
  Person3Outlined,
  SettingsOutlined,
} from "@mui/icons-material";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <span className="logo">TripByDay</span>
        </Link>
      </div>
      <hr />
      <div className="bottom">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>

          <p className="title">MANAGEMENT</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <Person3Outlined className="icon" />
              <span>Users</span>
            </li>
          </Link>

          <Link to="/packageInDays" style={{ textDecoration: "none" }}>
            <li>
              <LocalGroceryStoreOutlined className="icon" />
              <span>PackageInDay</span>
            </li>
          </Link>

          <Link to="/packages" style={{ textDecoration: "none" }}>
            <li>
              <InsertChartOutlinedSharp className="icon" />
              <span>Package</span>
            </li>
          </Link>

          <Link to="/packageInDestinations" style={{ textDecoration: "none" }}>
            <li>
              <SettingsOutlined className="icon" />
              <span>PackageInDestination</span>
            </li>
          </Link>

          <Link to="/destinations" style={{ textDecoration: "none" }}>
            <li>
              <DiamondOutlined className="icon" />
              <span>Destination</span>
            </li>
          </Link>

          <Link to="/services" style={{ textDecoration: "none" }}>
            <li>
              <DnsOutlined className="icon" />
              <span>Service</span>
            </li>
          </Link>

          <Link to="/city" style={{ textDecoration: "none" }}>
            <li>
              <LocationCityIcon className="icon" />
              <span>City</span>
            </li>
          </Link>

          <Link to="/orders" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardOutlined className="icon" />
              <span>Orders</span>
            </li>
          </Link>

          <p className="title">EXIT</p>
          <li onClick={handleLogout} style={{ cursor: "pointer" }}>
            <ExitToAppOutlined className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
