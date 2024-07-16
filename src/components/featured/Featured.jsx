import React, { useEffect, useState } from "react";
import "./featured.scss";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import ChangingProgressProvider from "./ChangingProgressProvider";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getTotalMoney } from "../../api/orderApi";

const Featured = () => {
  const [totalMoney, setTotalMoney] = useState("");

  useEffect(() => {
    getTotalMoneyFunction();
  }, []);

  const getTotalMoneyFunction = () => {
    getTotalMoney()
      .then(async (response) => {
        const totalMoney = response.data.content;
        setTotalMoney(totalMoney);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertOutlinedIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <ChangingProgressProvider
            values={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
          >
            {(percentage) => (
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({
                  pathTransitionDuration: 0.95,
                  trailColor: "#82ca9d",
                  pathColor: "#210876",
                  textColor: "#210876",
                })}
              />
            )}
          </ChangingProgressProvider>
        </div>
        <p className="title">Total Sales</p>
        <p className="amount">{totalMoney} VND</p>
      </div>
    </div>
  );
};

export default Featured;
