import React, { useState } from "react";
import "./packagetable.scss";
import { DataGrid } from "@mui/x-data-grid";

export const rows = [
  {
    id: 1,
    name: "Tour du lịch cố đô Huế",
    description:
      "Giới thiệu về Huế biết bao nhiêu cho đủ để lột tả được hết nét trầm lắng, dịu dàng và bình yên của mảnh đất này. Đặt chân đến đây ta như sững lại trước sự lặng lẽ, nên thơ cực ấn tượng. Sức hút của thành phố sông Hương không nằm ở sự sôi động, náo nhiệt mà gây thiện cảm bởi vẻ đẹp thanh bình, yên ả, không ồn ào mà sâu lắng đi vào lòng người. Giờ đây, Huế đang từng ngày vươn mình mạnh mẽ để khẳng định sức mạnh của một thành phố năng động, trẻ trung, giàu tiềm năng du lịch không thua kém bất cứ địa phương nào.  ",
    status: "active",
    shortDescription:
      "Huế là thành phố có vẻ đẹp thanh, khí hậu mát mẻ, nhiều di tích lịch sử văn hóa và ẩm thực đặc sắc.",
    startTime: "05:00",
    endTime: "21:00",
  },
  {
    id: 2,
    name: "Tour du lịch thành phố Hồ Chí Minh",
    description:
      "Thành phố Hồ Chí Minh là một trong những thành phố lớn tại Việt Nam, vì thế những địa điểm du lịch Sài Gòn luôn thu hút một lượng lớn du khách trong và ngoài nước tham quan, khám phá. Rất nhiều những điểm đến độc đáo với đa dạng các hoạt động hứa hẹn sẽ mang đến cho bạn nhiều trải nghiệm thú vị.",
    status: "active",
    shortDescription:
      "Khám phá các điểm du lịch Sài Gòn nổi tiếng, đẹp mắt và hấp dẫn như Nhà thờ Đức Bà, Dinh Độc Lập, Bến Thành...",
    startTime: "10:00",
    endTime: "23:00",
  },
  {
    id: 3,
    name: "Tour du lịch thủ đô Hà Nội",
    description:
      "Những công trình từ thời Pháp thuộc, hàng quán vỉa hè bày bán đặc sản địa phương, xe máy luồn lách trên đường đông đúc... là những ấn tượng đầu tiên của du khách về Hà Nội. Với nhiều người, Hà Nội có tất cả những thứ thú vị để khám phá nơi đây theo cách riêng của mình.",
    shortDescription:
      "Bạn muốn biết thêm về Thủ đô hơn 1000 năm tuổi, vào thời điểm đặc biệt của Việt Nam?",
    status: "inactive",
    startTime: "06:00",
    endTime: "23:00",
  },
];

export const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "name", headerName: "Name", width: 100 },
  { field: "shortDescription", headerName: "Short Description", width: 250 },
  { field: "description", headerName: "Description", width: 250 },
  { field: "startTime", headerName: "Start Time", width: 100 },
  { field: "endTime", headerName: "End Time", width: 100 },
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

const PackageTable = () => {
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
        <span>Package Management</span>
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

export default PackageTable;
