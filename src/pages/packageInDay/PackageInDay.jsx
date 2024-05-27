import React from "react";
import "./packageInDay.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import PackageInDayTable from "../../components/packageInDayTable/PackageInDayTable";

const PackageInDay = () => {
  return (
    <div className="packageInDay">
      <Sidebar />
      <div className="packageInDayContainer">
        <Navbar />
        <PackageInDayTable />
      </div>
    </div>
  );
};

export default PackageInDay;
