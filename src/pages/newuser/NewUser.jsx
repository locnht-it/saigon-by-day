import React, { useState } from "react";
import "./newuser.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { DriveFolderUploadOutlined } from "@mui/icons-material";

const NewUser = () => {
  const [file, setFile] = useState(null);
  return (
    <div className="newuser">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New User</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={file ? URL.createObjectURL(file) : "/assets/person/DefaultProfile.jpg"}
              alt=""
              className="image"
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlined className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              <div className="formInput">
                <label>Username</label>
                <input type="text" id="username" placeholder="Your username" />
              </div>

              <div className="formInput">
                <label>Name</label>
                <input type="text" id="name" placeholder="Your name" />
              </div>

              <div className="formInput">
                <label>Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="youremail@gmail.com"
                />
              </div>

              <div className="formInput">
                <label>Phone</label>
                <input type="text" id="phone" placeholder="0123456789" />
              </div>

              <div className="formInput">
                <label>Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                />
              </div>

              <div className="formInput">
                <label>Date of Birth</label>
                <input type="date" id="dob" />
              </div>

              <div className="formInput">
                <label>Address</label>
                <input
                  type="text"
                  id="address"
                  placeholder="Ho Chi Minh City"
                />
              </div>

              <div className="formInput">
                <label for="role">Choose your role:</label>
                <select name="role" id="role">
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                  <option value="customer">Customer</option>
                </select>
              </div>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
