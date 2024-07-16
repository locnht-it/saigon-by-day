import React, { useEffect, useState } from "react";
import "./chart.scss";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getRevenueByMonth } from "../../api/orderApi";

const Chart = ({ title, aspect }) => {
  const [revenues, setRevenues] = useState({
    january: 0,
    february: 0,
    march: 0,
    april: 0,
    may: 0,
    june: 0,
    july: 0,
  });

  useEffect(() => {
    fetchRevenueData();
  }, []);

  const fetchRevenueData = async () => {
    const months = [
      { name: "january", month: 1 },
      { name: "february", month: 2 },
      { name: "march", month: 3 },
      { name: "april", month: 4 },
      { name: "may", month: 5 },
      { name: "june", month: 6 },
      { name: "july", month: 7 },
    ];

    const year = 2024;
    for (let { name, month } of months) {
      try {
        const response = await getRevenueByMonth(month, year);
        const result = response.data.content;
        setRevenues((prevRevenues) => ({
          ...prevRevenues,
          [name]: result,
        }));
      } catch (error) {
        console.error(`Error fetching revenue for ${name}:`, error);
      }
    }
  };

  const data = [
    { name: "January", revenue: revenues.january },
    { name: "February", revenue: revenues.february },
    { name: "March", revenue: revenues.march },
    { name: "April", revenue: revenues.april },
    { name: "May", revenue: revenues.may },
    { name: "June", revenue: revenues.june },
    { name: "July", revenue: revenues.july },
  ];

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <BarChart width={730} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
