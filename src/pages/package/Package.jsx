import React from "react";
import "./package.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import PackageTable from "../../components/packageTable/PackageTable";

const Package = () => {
  return (
    <div className="package">
      <Sidebar />
      <div className="packageContainer">
        <Navbar />
        <PackageTable />
      </div>
    </div>
  );
};

export default Package;
