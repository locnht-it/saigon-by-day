import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import "./sidebar.scss";
import {
  AddLocationAltOutlined,
  BackpackOutlined,
  CardTravelOutlined,
  CreditCardOutlined,
  DiamondOutlined,
  DnsOutlined,
  ExitToAppOutlined,
  InsertChartOutlinedSharp,
  LocalGroceryStoreOutlined,
  Person3Outlined,
  SettingsOutlined,
  TripOriginOutlined,
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
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">TripByDay</span>
        </Link>
      </div>
      <hr />
      <div className="bottom">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          {/* <Link to="/order" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardOutlined className="icon" />
              <span>Transactions</span>
            </li>
          </Link> */}
          <Link to="/service" style={{ textDecoration: "none" }}>
            <li>
              <TripOriginOutlined className="icon" />
              <span>Service</span>
            </li>
          </Link>

          <p className="title">MANAGEMENT</p>
          <Link to="/package-in-day" style={{ textDecoration: "none" }}>
            <li>
              <CardTravelOutlined className="icon" />
              <span>PackageInDay</span>
            </li>
          </Link>
          <Link to="/package" style={{ textDecoration: "none" }}>
            <li>
              <BackpackOutlined className="icon" />
              <span>Package</span>
            </li>
          </Link>
          <Link to="/destination" style={{ textDecoration: "none" }}>
            <li>
              <AddLocationAltOutlined className="icon" />
              <span>Destination</span>
            </li>
          </Link>
          <Link to="/city" style={{ textDecoration: "none" }}>
            <li>
              <LocationCityIcon className="icon" />
              <span>City</span>
            </li>
          </Link>
          <Link to="/user" style={{ textDecoration: "none" }}>
            <li>
              <Person3Outlined className="icon" />
              <span>User</span>
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
