import React from "react";
import "./list.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const rows = [
  {
    id: 1,
    packageId: 1,
    packageName: "Tour tham quan di tích Sài Gòn",
    date: "5/24/2024",
    img: "/assets/NhaThoDucBa.jpg",
    price: 3_000_000,
    status: "active",
    numberAttendance: 5,
  },
  {
    id: 2,
    packageId: 1,
    date: "5/25/2024",
    packageName: "Tour Sài Gòn ngày giải phóng",
    img: "/assets/DinhDocLapjpg.jpg",
    price: 2_500_000,
    status: "active",
    numberAttendance: 5,
  },
  {
    id: 3,
    packageId: 2,
    date: "5/30/2024",
    packageName: "Tour vui chơi giải trí Sài Gòn",
    img: "/assets/ThaoCamVien.jpg",
    price: 5_000_000,
    status: "active",
    numberAttendance: 5,
  },
  {
    id: 4,
    packageId: 2,
    date: "6/1/2024",
    packageName: "Sài Gòn về đêm",
    img: "/assets/DamSen.jpg",
    price: 5_500_000,
    status: "active",
    numberAttendance: 5,
  },
  {
    id: 5,
    packageId: 3,
    date: "6/1/2024",
    packageName: "Tour tham quan các địa danh Sài Gòn",
    img: "/assets/Landmark81.jpg",
    price: 3_000_000,
    status: "inactive",
    numberAttendance: 5,
  },
];

const List = () => {
  return (
    <div className="list">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">PackageInDay ID</TableCell>
              <TableCell className="tableCell">Package</TableCell>
              <TableCell className="tableCell">Date</TableCell>
              <TableCell className="tableCell">Price (vnd)</TableCell>
              <TableCell className="tableCell">Number Attendance</TableCell>
              <TableCell className="tableCell">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="tableCell">{row.id}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    <img src={row.img} alt="" className="image" />
                    {row.packageName}
                  </div>
                </TableCell>
                <TableCell className="tableCell">{row.date}</TableCell>
                <TableCell className="tableCell">{row.price}</TableCell>
                <TableCell className="tableCell">
                  {row.numberAttendance}
                </TableCell>
                <TableCell className="tableCell">
                  <span className={`status ${row.status}`}>{row.status}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default List;
