import React from "react";
import "./city.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import CityTable from "../../components/citytable/CityTable";

const City = () => {
  return (
    <div className="city">
      <Sidebar />
      <div className="cityContainer">
        <Navbar />
        <CityTable />
      </div>
    </div>
  );
};

export default City;
