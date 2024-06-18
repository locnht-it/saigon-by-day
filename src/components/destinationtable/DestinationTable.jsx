import React, { useState } from "react";
import "./destinationtable.scss";
import { DataGrid } from "@mui/x-data-grid";

export const rows = [
  {
    id: 1,
    galleryId: 1,
    name: "Hoàng Thành Huế",
    address: "Lê Huân, Phú Hậu, Thành phố Huế, Thừa Thiên Huế",
    description:
      "Đại Nội Huế có hơn 100 công trình kiến trúc nổi bật như Ngọ Môn, Điện Thái Hòa, Cung Diên Thọ, Cung Trường Sanh, Hưng Miếu, Thế Miếu... Quần thể công trình cổ kính này được bố trí theo nguyên tắc tả nam hữu nữ, tả văn hữu võ, tính từ trong ra. Ngay cả các miếu thờ cũng có sự sắp xếp theo thứ tự tả chiêu hữu mục (trái trước, phải sau, lần lượt theo thời gian).",
    status: "active",
    shortDescription:
      "Đại Nội Huế có hơn 100 công trình kiến trúc nổi bật như Ngọ Môn, Điện Thái Hòa",
    activities: "Tham quan Hoàng Thành Huế",
    city: "Thành phố Huế",
  },
  {
    id: 2,
    galleryId: 2,
    name: "Landmark 81",
    address:
      "720A Đ. Điện Biên Phủ, Vinhomes Tân Cảng, Bình Thạnh, Hồ Chí Minh",
    description:
      "Landmark 81 là tòa nhà cao bậc nhất Đông Nam Á, nằm trong tổ hợp dự án Vinhomes Central Park tại Sài Gòn. Ở bất cứ đâu trong thành phố, bạn cũng dễ dàng nhìn thấy tòa nhà chọc trời này. ",
    shortDescription:
      "Landmark 81 là tòa nhà cao bậc nhất Đông Nam Á, nằm trong tổ hợp dự án Vinhomes Central Park tại Sài Gòn",
    activities: "Ăn uống, mua sắm",
    city: "Thành phố Hồ Chí Minh",
    status: "inactive",
  },
  {
    id: 3,
    galleryId: 3,
    name: "Văn Miếu Quốc Tử Giám",
    address: "58 P. Quốc Tử Giám, Văn Miếu, Đống Đa, Hà Nội",
    description:
      "Văn Miếu Quốc Tử Giám là quần thể nằm trong danh sách các Di tích Quốc gia đặc biệt của Việt Nam, niềm tự hào của con dân đất Việt. Với bề dày văn hóa – lịch sử lâu đời, khu di tích đã trở thành điểm đến hấp dẫn trong các chuyến tham quan, khám phá du lịch Hà Nội. Đồng thời, đây cũng là nơi mà các cô cậu học trò, sĩ tử đến cầu may mắn trước mỗi kỳ thi quan trọng.",
    shortDescription:
      "Văn Miếu Quốc Tử Giám là quần thể nằm trong danh sách các Di tích Quốc gia đặc biệt của Việt Nam,...",
    status: "active",
    activities: "Tham quan Văn Miếu",
    city: "Thủ đô Hà Nội",
  },
];

export const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "galleryId", headerName: "Gallery ID", width: 80 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "address", headerName: "Address", width: 200 },
  { field: "shortDescription", headerName: "Short Description", width: 200 },
  { field: "description", headerName: "Description", width: 200 },
  { field: "activities", headerName: "Activities", width: 200 },
  { field: "city", headerName: "City", width: 150 },
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

const DestinationTable = () => {
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
        <span>Destination Management</span>
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

export default DestinationTable;
