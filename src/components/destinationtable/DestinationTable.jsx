import React, { useEffect, useState } from "react";
import "./destinationtable.scss";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { deleteDestination, listDestinations } from "../../api/destinationApi";
import { getCity } from "../../api/cityApi";

const DestinationTable = () => {
  const [destinations, setDestinations] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [cityNamesCache, setCityNamesCache] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    getAllDestinations(1, 5);
  }, []);

  const getAllDestinations = (page, limit) => {
    listDestinations(page, limit)
      .then(async (response) => {
        const destinations = response.data.content;
        setDestinations(destinations);
        setTotalPages(response.data.meatadataDTO.total);

        // Fetch city names for all destinations
        const cityIds = destinations.map((d) => d.cityId);
        const uniqueCityIds = [...new Set(cityIds)];
        const cityNames = {};

        await Promise.all(
          uniqueCityIds.map(async (cityId) => {
            if (!cityNamesCache[cityId]) {
              try {
                const response = await getCity(cityId);
                cityNames[cityId] = response.data.content.name;
              } catch (error) {
                console.error(error);
              }
            }
          })
        );

        setCityNamesCache((prev) => ({ ...prev, ...cityNames }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addNewDestination = () => {
    navigate("/destination/save");
  };

  const updateDestination = (id) => {
    navigate(`/destination/update/${id}`);
  };

  const removeDestination = (id) => {
    deleteDestination(id)
      .then(() => {
        getAllDestinations(1, 5);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePageClick = (event) => {
    getAllDestinations(event.selected + 1, 5);
  };
  return (
    <div className="container">
      <h2 className="text-center">Destination Management</h2>
      <button
        type="button"
        className="btn btn-primary"
        onClick={addNewDestination}
        id="addButton"
      >
        Add New Destination
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th className="text-center">Name</th>
            <th className="text-center">Address</th>
            <th className="text-center">Status</th>
            <th className="text-center">City</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {destinations.map((destination) => (
            <tr key={destination.id}>
              <td>{destination.name}</td>
              <td>{destination.address}</td>
              <td>{destination.status ? "Active" : "Inactive"}</td>
              <td>{cityNamesCache[destination.cityId] || "Loading..."}</td>
              <td className="d-flex">
                <button
                  className="btn btn-info me-2"
                  onClick={() => updateDestination(destination.id)}
                >
                  View
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeDestination(destination.id)}
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

export default DestinationTable;
