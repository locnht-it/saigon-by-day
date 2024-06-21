import React, { useEffect, useState } from "react";
import "./citytable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useUser } from "../../app/userContext";
import { useNavigate } from "react-router-dom";
import { deleteCity, listCities } from "../../api/cityApi";
import ReactPaginate from "react-paginate";
import { getAuthToken } from "../../api/axios_helper";

export const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "Name", headerName: "Name", width: 120 },
];

const CityTable = () => {
  const [cities, setCities] = useState([]);
  //const [totalCities, setTotalCities] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const navigator = useNavigate();

  useEffect(() => {
    getAllCities(1, 5);
  }, []);

  function getAllCities(page, limit) {
    const token = getAuthToken();

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log("Headers:", headers); // In ra headers để kiểm tra

    listCities(page, limit, { headers })
      .then((response) => {
        setCities(response.data);
        setTotalPages(response.data.meatadataDTO.total);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewCity() {
    navigator("/save");
  }

  function updateCity(id) {
    navigator(`/update/${id}`);
  }

  function removeCity(id) {
    console.log(id);

    deleteCity(id)
      .then((response) => {
        getAllCities();
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
      <button type="button" className="btn btn-primary" onClick={addNewCity}>
        Add New City
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>City Id</th>
            <th>City Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city) => (
            <tr key={city.id}>
              <td>{city.id}</td>
              <td>{city.name}</td>
              <td>
                <button
                  className="btn btn-info"
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
export default CityTable;
