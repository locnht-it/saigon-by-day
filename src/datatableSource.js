export const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
        field: "user",
        headerName: "User",
        width: 230,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.img} alt="avatar" />
                    {params.row.username}
                </div>
            );
        },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
        field: "age",
        headerName: "Age",
        type: "number",
        width: 100,
    },
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

export const userRows = [
    {
        id: 1,
        username: "Ngo Huynh Tan Loc",
        img: "/assets/person/LocNgo.jpg",
        email: "locht1@gmail.com",
        status: "active",
        age: 21,
    }, 
    {
        id: 2,
        username: "Le Phan Hoai Nam",
        img: "/assets/person/NamLee.jpg",
        email: "namlee1@gmail.com",
        status: "active",
        age: 22,
    },
    {
        id: 3,
        username: "Ha Cong Hieu",
        img: "/assets/person/HieuHa.jpg",
        email: "hieuha1@gmail.com",
        status: "active",
        age: 23,
    },
    {
        id: 4,
        username: "Huynh Thanh Nha",
        img: "/assets/person/NhaHuynh.jpg",
        email: "nhahuynh1@gmail.com",
        status: "active",
        age: 24,
    },
]