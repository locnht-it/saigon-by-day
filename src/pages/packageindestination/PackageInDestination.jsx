import React from "react";
import "./packageindestination.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import PackageInDestinationTable from "../../components/packageInDestinationTable/PackageInDestination";

const PackageInDestination = () => {
  return (
    <div className="packageInDestination">
      <Sidebar />
      <div className="packageInDestinationContainer">
        <Navbar />
        <PackageInDestinationTable />
      </div>
    </div>
  );
};

export default PackageInDestination;
