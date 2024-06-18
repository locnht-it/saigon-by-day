import React, { useState } from "react";
import "./ordertable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { date } from "yup";

export const rows = [
  {
    id: 1,
    userId: 1,
    totalPrice: 2500000,
    date: "5/30/2024",
    method: "Bank Transfer",
    status: "paid",
    purchaseDate: "5/30/2024",
  },
  {
    id: 2,
    userId: 2,
    totalPrice: 3500000,
    date: "6/01/2024",
    method: "Bank Transfer",
    status: "pending",
    purchaseDate: "",
  },
  {
    id: 3,
    userId: 3,
    totalPrice: 2000000,
    date: "5/29/2024",
    method: "Bank Transfer",
    status: "rejected",
    purchaseDate: "",
  },
];

export const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "userId", headerName: "User ID", width: 70 },
  { field: "totalPrice", headerName: "Total Price", width: 200 },
  { field: "date", headerName: "Order Date", width: 200 },
  { field: "method", headerName: "Method", width: 200 },
  { field: "purchaseDate", headerName: "Purchase Date", width: 200 },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

const OrderTable = () => {
  const [data, setData] = useState(rows);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
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
        <span>Order Management</span>
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

export default OrderTable;
