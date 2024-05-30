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
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>

          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <Person3Outlined className="icon" />
              <span>Users</span>
            </li>
          </Link>

          <Link to="/packageInDays" style={{ textDecoration: "none" }}>
            <li>
              <LocalGroceryStoreOutlined className="icon" />
              <span>PackageInDays</span>
            </li>
          </Link>

          <li>
            <CreditCardOutlined className="icon" />
            <span>Orders</span>
          </li>

          <p className="title">CHARTS</p>
          <li>
            <InsertChartOutlinedSharp className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsActiveOutlined className="icon" />
            <span>Notifications</span>
          </li>

          <p className="title">SERVICE</p>
          <li>
            <DnsOutlined className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <SettingsOutlined className="icon" />
            <span>Settings</span>
          </li>

          <p className="title">USER INTERFACE</p>
          <li>
            <ManageAccountsOutlined className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <CalendarMonthOutlined className="icon" />
            <span>Calendar</span>
          </li>
          <li>
            <DiamondOutlined className="icon" />
            <span>Helper</span>
          </li>

          <li>
            <ExitToAppOutlined className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
