import React, { useState } from "react";
import "./packageindestination.scss";
import { DataGrid } from "@mui/x-data-grid";

export const rows = [
  {
    id: 1,
    packageId: 1,
    destinationId: 1,
    startTime: "5:00",
    endTime: "21:00",
    transportation: "Car",
  },
  {
    id: 2,
    packageId: 2,
    destinationId: 2,
    startTime: "10:00",
    endTime: "23:00",
    transportation: "Car",
  },
  {
    id: 3,
    packageId: 3,
    destinationId: 3,
    startTime: "06:00",
    endTime: "23:00",
    transportation: "Car",
  },
];

export const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "packageId", headerName: "Package ID", width: 200 },
  { field: "destinationId", headerName: "Destination ID", width: 200 },
  { field: "startTime", headerName: "Start Time", width: 200 },
  { field: "endTime", headerName: "End Time", width: 200 },
];

const PackageInDestinationTable = () => {
  const [data, setData] = useState(rows);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="editButton">Edit</div>
            <div className="deleteButton">Delete</div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <span>PackageInDestination Management</span>
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

export default PackageInDestinationTable;
