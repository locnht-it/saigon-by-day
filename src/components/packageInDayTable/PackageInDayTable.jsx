import React, { useState } from "react";
import "./packageindaytable.scss";
import { DataGrid } from "@mui/x-data-grid";

export const rows = [
  {
    id: 1,
    packageId: 1,
    date: "5/24/2024",
    price: 3_000_000,
    status: "active",
    numberAttendance: 5,
  },
  {
    id: 2,
    packageId: 1,
    date: "6/1/2024",
    price: 4_000_000,
    status: "active",
    numberAttendance: 5,
  },
  {
    id: 3,
    packageId: 2,
    date: "5/30/2024",
    price: 1_500_000,
    status: "inactive",
    numberAttendance: 7,
  },
  {
    id: 4,
    packageId: 3,
    date: "5/31/2024",
    price: 5_000_000,
    status: "active",
    numberAttendance: 10,
  },
  {
    id: 5,
    packageId: 4,
    date: "5/25/2024",
    price: 3_000_000,
    status: "inactive",
    numberAttendance: 5,
  },
];

export const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "packageId", headerName: "Package ID", width: 200 },
  { field: "date", headerName: "Date", width: 200 },
  { field: "numberAttendance", headerName: "Number Attendance", width: 200 },
  {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
          return (
              <div className={`cellWithStatus ${params.row.status}`}>
                  {params.row.status}
              </div>
          );
      },
  },
];

const PackageInDayTable = () => {
  const [data, setData] = useState(rows);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="deleteButton">Delete</div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <span>Add New Package In Day</span>
        <span className="link">Add New</span>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={columns.concat(actionColumn)}
        pageSize={8}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};

export default PackageInDayTable;
