import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import "./sidebar.scss";
import {
  CalendarMonthOutlined,
  CreditCardOutlined,
  DiamondOutlined,
  DnsOutlined,
  ExitToAppOutlined,
  InsertChartOutlinedSharp,
  LocalGroceryStoreOutlined,
  ManageAccountsOutlined,
  NotificationsActiveOutlined,
  Person3Outlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = () => {
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

          <Link to="/orders" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardOutlined className="icon" />
              <span>Orders</span>
            </li>
          </Link>

          <p className="title">EXIT</p>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <li>
              <ExitToAppOutlined className="icon" />
              <span>Logout</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
