import React, { useEffect, useState } from "react";
import "./packageindaytable.scss";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import {
  deletePackageInDay,
  listPackageInDays,
} from "../../api/packageInDayApi";

const PackageInDayTable = () => {
  const [packageInDays, setPackageInDays] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    getAllPackageInDays(1, 5);
  }, []);

  const getAllPackageInDays = (page, limit) => {
    listPackageInDays(page, limit)
      .then(async (response) => {
        const packageInDays = response.data.content;
        setPackageInDays(packageInDays);
        setTotalPages(response.data.meatadataDTO.total);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addNewPackageInDay = () => {
    navigate("/package-in-day/save");
  };

  const updatePackageInDay = (id) => {
    navigate(`/package-in-day/update/${id}`);
  };

  const removePackageInDay = (id) => {
    deletePackageInDay(id)
      .then(() => {
        getAllPackageInDays(1, 5);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePageClick = (event) => {
    getAllPackageInDays(event.selected + 1, 5);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="container">
      <h2 className="text-center">PackageInDay Management</h2>
      <button
        type="button"
        className="btn btn-primary"
        onClick={addNewPackageInDay}
        id="addButton"
      >
        Add New PackageInDay
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th className="text-center">Code</th>
            <th className="text-center">Package</th>
            <th className="text-center">Date</th>
            <th className="text-center">Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {packageInDays.map((packageInDay) => (
            <tr key={packageInDay.id}>
              <td>{packageInDay.code}</td>
              <td>{packageInDay.packageName}</td>
              <td>{formatDate(packageInDay.date)}</td>
              <td>{packageInDay.status ? "Active" : "Inactive"}</td>

              <td className="d-flex">
                <button
                  className="btn btn-info me-2"
                  onClick={() => updatePackageInDay(packageInDay.id)}
                >
                  View
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removePackageInDay(packageInDay.id)}
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

export default PackageInDayTable;
