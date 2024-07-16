import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCity, listCities } from "../../api/cityApi";
import ReactPaginate from "react-paginate";
import { listUsers } from "../../api/userApi";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers(1, 5);
  }, []);

  function getAllUsers(page, limit) {
    listUsers(page, limit)
      .then((response) => {
        console.log(response.data);
        setUsers(response.data.content);
        setTotalPages(response.data.meatadataDTO.total);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //   function addNewCity() {
  //     navigate("/city/save");
  //   }

  function updateUser(id) {
    navigate(`/user/profile/${id}`);
  }

  //   function removeCity(id) {
  //     console.log(id);

  //         deleteCity(id)
  //           .then(() => {
  //             getAllUsers(1, 5);
  //           })
  //           .catch((error) => {
  //             console.error(error);
  //           });
  //       }

  const handlePageClick = (event) => {
    getAllUsers(+event.selected + 1, 5);
  };

  return (
    <div className="container">
      <h2 className="text-center">User Management</h2>
      {/* <button
        type="button"
        className="btn btn-primary"
        onClick={addNewCity}
        id="addButton"
      >
        Add New City
      </button> */}
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th className="text-center">Name</th>
            <th className="text-center">Email</th>
            <th className="text-center">Role</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.fullname}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>

              {/* {city.status ? <td>Active</td> : <td>Inactive</td>} */}
              <td className="d-flex">
                <button
                  className="btn btn-info me-2"
                  onClick={() => updateUser(user.id)}
                >
                  View
                </button>
                {/* <button
                    className="btn btn-danger"
                    onClick={() => removeCity(city.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
  );
};

export default UserTable;
