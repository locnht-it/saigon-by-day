import React from "react";
import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import PackageRevenue from "../../components/packagerevenue/PackageRevenue";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="charts">
          <Featured />
          <Chart title="Last 6 months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">PackageInDay Report</div>
          <PackageRevenue />
        </div>
      </div>
    </div>
  );
};

export default Home;
