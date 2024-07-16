import React, { useEffect, useState } from "react";
import "./packagetable.scss";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { deletePackage, listPackages } from "../../api/packageApi";

const PackageTable = () => {
  const [packages, setPackages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    getAllPackages(1, 5);
  }, []);

  const convertLongToDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return date.toLocaleString("en-US", options).replace(",", "");
  };

  function getAllPackages(page, limit) {
    listPackages(page, limit)
      .then((response) => {
        console.log(response.data);

        // Check if response.data.content has packages or not
        if (response.data.content && response.data.content.length > 0) {
          setPackages(response.data.content);
        } else if (
          response.data.content.packageDTO &&
          response.data.content.packageDTO.length > 0
        ) {
          setPackages(response.data.content.packageDTO);
        } else {
          setPackages([]); // Default to empty array if no packages found
        }
        setTotalPages(response.data.meatadataDTO.total);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewPackage() {
    navigate("/package/save");
  }

  function updatePackage(id) {
    navigate(`/package/update/${id}`);
  }

  function removePackage(id) {
    console.log(id);

    deletePackage(id)
      .then(() => {
        getAllPackages(1, 5); // Cập nhật lại danh sách thành phố sau khi xóa
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handlePageClick = (event) => {
    getAllPackages(+event.selected + 1, 5);
  };

  return (
    <div className="container">
      <h2 className="text-center">Package Management</h2>
      <button
        type="button"
        className="btn btn-primary"
        onClick={addNewPackage}
        id="addButton"
      >
        Add Package City
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th className="text-center">Name</th>
            <th className="text-center">Start Time</th>
            <th className="text-center">End Time</th>
            <th className="text-center">Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((packageEntity) => (
            <tr key={packageEntity.id}>
              <td>{packageEntity.name}</td>
              <td>{convertLongToDateTime(packageEntity.startTime)}</td>
              <td>{convertLongToDateTime(packageEntity.endTime)}</td>
              <td>{packageEntity.status ? "Active" : "Inactive"}</td>
              <td className="d-flex">
                <button
                  className="btn btn-info me-2"
                  onClick={() => updatePackage(packageEntity.id)}
                >
                  View
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removePackage(packageEntity.id)}
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

export default PackageTable;
