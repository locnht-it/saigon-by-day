import React, { useContext } from "react";
import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import Switch from "@mui/material/Switch";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import {
  ChatBubbleOutlineOutlined,
  NotificationsActiveOutlined,
} from "@mui/icons-material";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="navbar">
      <div className="navbarContainer">
        <div className="search">
          <input type="text" placeholder="search" />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            <span>English</span>
          </div>
          <div className="item">
            <Switch
              style={{ color: "#210876" }}
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <FullscreenOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsActiveOutlined className="icon" />
            <div className="counter">3</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlined className="icon" />
            <div className="counter">5</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <img
              src="/assets/person/LocNgo.jpg"
              alt=""
              className="profileImg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
