import React, { useContext, useState } from "react";
import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import Switch from "@mui/material/Switch";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import {
  AccountCircle,
  ChatBubbleOutlineOutlined,
  NotificationsActiveOutlined,
} from "@mui/icons-material";

import { DarkModeContext } from "../../context/darkModeContext";
import { Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { dispatch } = useContext(DarkModeContext);

  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
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
          {/* <div className="item">
            <ListOutlinedIcon className="icon" />
          </div> */}
          <div className="item">
            <AccountCircle className="icon" onClick={handleUserClick} />
            <Menu
              keepMounted
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleCloseMenu}>
                <Link to="/users/userId" style={{ textDecoration: "none" }}>
                  My account
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseMenu}>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  Logout
                </Link>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
