import React from "react";
import "./destination.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DestinationTable from "../../components/destinationtable/DestinationTable";

const Destination = () => {
  return (
    <div className="destination">
      <Sidebar />
      <div className="destinationContainer">
        <Navbar />
        <DestinationTable />
      </div>
    </div>
  );
};

export default Destination;
