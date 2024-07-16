import React, { useEffect, useState } from "react";
import "./servicetable.scss";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { getDestination } from "../../api/destinationApi";
import { deleteService, listServices } from "../../api/serviceApi";

const ServiceTable = () => {
  const [services, setServices] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [destinationNamesCache, setDestinationNamesCache] = useState({});

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getAllServices(1, 5);
  }, []);

  const getAllServices = (page, limit) => {
    listServices(page, limit)
      .then(async (response) => {
        const services = response.data.content;
        setServices(services);
        setTotalPages(response.data.meatadataDTO.total);

        const destinationIds = services.map((d) => d.destinationId);
        const uniqueDestinationIds = [...new Set(destinationIds)];
        const destinationNames = {};

        await Promise.all(
          uniqueDestinationIds.map(async (destinationId) => {
            if (!destinationNamesCache[destinationId]) {
              try {
                const response = await getDestination(destinationId);
                destinationNames[destinationId] = response.data.content.name;
              } catch (error) {
                console.error(error);
              }
            }
          })
        );

        setDestinationNamesCache((prev) => ({ ...prev, ...destinationNames }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addNewService = () => {
    navigate("/service/save");
  };

  const updateService = (id) => {
    navigate(`/service/update/${id}`);
  };

  const removeService = (id) => {
    deleteService(id)
      .then(() => {
        getAllServices(1, 5);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePageClick = (event) => {
    getAllServices(event.selected + 1, 5);
  };

  // Utility function to convert timestamp to datetime string
  const convertLongToDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container">
      <h2 className="text-center">Service Management</h2>
      <button
        type="button"
        className="btn btn-primary"
        onClick={addNewService}
        id="addButton"
      >
        Add New Service
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th className="text-center">Name</th>
            <th className="text-center">Destination</th>
            <th className="text-center">Created By</th>
            <th className="text-center">Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.name}</td>
              <td>
                {destinationNamesCache[service.destinationId] || "Loading..."}
              </td>
              {user ? <td>{user.fullname}</td> : <td>No user logged in</td>}
              <td>{service.status ? "Active" : "Inactive"}</td>
              <td className="d-flex">
                <button
                  className="btn btn-info me-2"
                  onClick={() => updateService(service.id)}
                >
                  View
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeService(service.id)}
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

export default ServiceTable;
