import React, { useState } from "react";
import "./servicetable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useUser } from "../../app/userContext";

export const rows = [
  {
    id: 1,
    name: "Dịch vụ tham quan Hoàng Thành Huế",
    description:
      "Dịch vụ tham quan Hoàng Thành Huế sẽ cung cấp vé cho khách hàng vào thời điểm trước khi tham quan Hoàng Thành và hướng dẫn viên cùng đồng hành xuyên suốt dịch vụ.",
    startTime: "8:00",
    endTime: "11:00",
    price: 300000,
    category: "Di tích lịch sử",
    status: "active",
    shortDescription:
      "Mua vé vào Hoàng Thành Huế và hướng dẫn viên giới thiệu về Hoàng Thành.",
    destinationId: 1,
    supplierId: 1,
  },
  {
    id: 2,
    name: "Dịch vụ dùng bữa tại Hadilao Landmark81",
    description:
      "Đặt chỗ, chọn món và thanh toán bữa trưa tại Haidilao Landmark81",
    startTime: "8:00",
    endTime: "11:00",
    price: 1000000,
    category: "Ăn uống",
    status: "active",
    shortDescription:
      "Đặt chỗ, chọn món và thanh toán bữa trưa tại Haidilao Landmark81",
    destinationId: 2,
    supplierId: 2,
  },
  {
    id: 3,
    name: "Dịch vụ tham quan Văn Miếu Quốc Tử Giám",
    description:
      "Dịch vụ tham quan Văn Miếu sẽ cung cấp vé cho khách hàng vào thời điểm trước khi tham quan Văn Miếu và hướng dẫn viên cùng đồng hành xuyên suốt dịch vụ.",
    startTime: "8:00",
    endTime: "11:00",
    price: 100000,
    category: "Ăn uống",
    status: "active",
    shortDescription:
      "Mua vé vào Hoàng Thành Huế và hướng dẫn viên giới thiệu về Văn Miếu.",
    destinationId: 3,
    supplierId: 3,
  },
];

export const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "destinationId", headerName: "Destination ID", width: 120 },
  { field: "supplierId", headerName: "Supplier ID", width: 100 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "price", headerName: "Price", width: 200 },
  { field: "category", headerName: "Category", width: 200 },
  { field: "shortDescription", headerName: "Short Description", width: 200 },
  { field: "description", headerName: "Description", width: 200 },
  { field: "startTime", headerName: "Start Time", width: 200 },
  { field: "endTime", headerName: "End Time", width: 200 },
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

const ServiceTable = () => {
  const [data, setData] = useState(rows);
  const { user } = useUser();

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
        <span>Service Management</span>
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

export default ServiceTable;
