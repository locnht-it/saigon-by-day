import React from "react";
import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { AccountCircle } from "@mui/icons-material";

const Single = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            {/* <span className="editButton">Edit</span> */}
            <div className="item">
              <AccountCircle className="itemImg" />

              <div className="details">
                <h1 className="itemTitle">{user.fullname}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email: </span>
                  <span className="itemValue">{user.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone: </span>
                  <span className="itemValue">{user.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address: </span>
                  <span className="itemValue">{user.address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Role: </span>
                  <span className="itemValue">{user.role}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
