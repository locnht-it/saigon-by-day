import React, { useEffect, useState } from "react";
import "./citytable.scss";
import { useNavigate } from "react-router-dom";
import { deleteCity, listCities } from "../../api/cityApi";
import ReactPaginate from "react-paginate";

const CityTable = () => {
  const [cities, setCities] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    getAllCities(1, 5);
  }, []);

  function getAllCities(page, limit) {
    listCities(page, limit)
      .then((response) => {
        console.log(response.data);
        setCities(response.data.content);
        setTotalPages(response.data.meatadataDTO.total); // Sửa lại để tính đúng số trang
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewCity() {
    navigate("/city/save");
  }

  function updateCity(id) {
    navigate(`/city/update/${id}`);
  }

  function removeCity(id) {
    console.log(id);

    deleteCity(id)
      .then(() => {
        getAllCities(1, 5); // Cập nhật lại danh sách thành phố sau khi xóa
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handlePageClick = (event) => {
    getAllCities(+event.selected + 1, 5);
  };

  return (
    <div className="container">
      <h2 className="text-center">City Management</h2>
      <button
        type="button"
        className="btn btn-primary"
        onClick={addNewCity}
        id="addButton"
      >
        Add New City
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th className="text-center">City Code</th>
            <th className="text-center">City Name</th>
            <th className="text-center">Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cities.map(
            (city) => (
              //city.status ? ( // Kiểm tra trạng thái của thành phố
              <tr key={city.id}>
                <td>{city.code}</td>
                <td>{city.name}</td>
                {city.status ? <td>Active</td> : <td>Inactive</td>}
                <td className="d-flex">
                  <button
                    className="btn btn-info me-2"
                    onClick={() => updateCity(city.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCity(city.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
            //) : null // Không hiển thị nếu `city.status` là `false`
          )}
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

export default CityTable;
