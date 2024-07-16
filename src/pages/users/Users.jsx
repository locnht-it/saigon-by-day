import React from "react";
import "./Users.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import UserTable from "../../components/usertable/UserTable";

const Users = () => {
  return (
    <div className="users">
      <Sidebar />

      <div className="usersContainer">
        <Navbar />
        <UserTable />
      </div>
    </div>
  );
};

export default Users;
