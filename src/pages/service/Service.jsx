import React from "react";
import "./service.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ServiceTable from "../../components/servicetable/ServiceTable";

const Service = () => {
  return (
    <div className="service">
      <Sidebar />
      <div className="serviceContainer">
        <Navbar />
        <ServiceTable />
      </div>
    </div>
  );
};

export default Service;
