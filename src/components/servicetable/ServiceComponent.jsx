import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { listDestinations } from "../../api/destinationApi";
import { createService, getService, updateService } from "../../api/serviceApi";

const ServiceComponent = () => {
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState(false);
  const [destinationId, setDestinationId] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [userId, setUserId] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [view, setView] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setUserId(user.id);
    if (id) {
      setIsUpdate(true);
      getService(id)
        .then((response) => {
          const service = response.data.content;
          setName(service.name);
          setStartTime(convertLongToDateTime(service.startTime));
          setEndTime(convertLongToDateTime(service.endTime));
          setShortDescription(service.shortDescription);
          setDescription(service.description);
          setPrice(service.price);
          setCategory(service.category);
          setStatus(service.status);
          setDestinationId(service.destinationId);
          setView(true);
        })
        .catch((error) => {
          console.error("Error fetching service:", error);
        });
    }

    listDestinations(1, 100)
      .then((response) => {
        setDestinations(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching destinations:", error);
      });
  }, [id]);

  const convertLongToDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const pad = (num) => (num < 10 ? `0${num}` : num);
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  function saveOrUpdateService(e) {
    e.preventDefault();
    setApiError("");

    if (validateForm()) {
      const service = {
        name,
        startTime: new Date(startTime).getTime(),
        endTime: new Date(endTime).getTime(),
        shortDescription,
        description,
        price: parseFloat(price),
        category,
        status,
        destinationId,
        userId,
      };

      console.log(service);

      if (id) {
        if (!view) {
          updateService(id, service)
            .then((response) => {
              console.log(response.data);
              navigate("/service");
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          setView(false);
        }
      } else {
        createService(service)
          .then((response) => {
            console.log(response.data);
            navigate("/service");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  function validateForm() {
    const errorsCopy = {};

    if (!name.trim()) errorsCopy.name = "Name is required";
    if (!startTime) errorsCopy.startTime = "Start Time is required";
    if (!endTime) errorsCopy.endTime = "End Time is required";
    if (!shortDescription.trim())
      errorsCopy.shortDescription = "Short Description is required";
    if (!description.trim()) errorsCopy.description = "Description is required";
    if (!price) errorsCopy.price = "Price is required";
    if (!category.trim()) errorsCopy.category = "Category is required";
    if (!destinationId) errorsCopy.destinationId = "Destination is required";

    setErrors(errorsCopy);

    return Object.keys(errorsCopy).length === 0;
  }

  function pageTitle() {
    return (
      <h2 className="text-center">
        {id ? "Update Service" : "Add New Service"}
      </h2>
    );
  }

  const backToList = () => {
    navigate("/service");
  };

  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Name:</label>
                <input
                  type="text"
                  placeholder="Enter Service Name"
                  name="name"
                  value={name}
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  onChange={(e) => setName(e.target.value)}
                  disabled={view && isUpdate}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Start Time:</label>
                <input
                  type="datetime-local"
                  name="startDate"
                  value={startTime}
                  className={`form-control ${
                    errors.startDate ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setStartTime(e.target.value)}
                  disabled={view && isUpdate}
                />
                {errors.startDate && (
                  <div className="invalid-feedback">{errors.startDate}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">End Time:</label>
                <input
                  type="datetime-local"
                  name="endTime"
                  value={endTime}
                  className={`form-control ${
                    errors.endTime ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setEndTime(e.target.value)}
                  disabled={view && isUpdate}
                />
                {errors.endTime && (
                  <div className="invalid-feedback">{errors.endTime}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Short Description:</label>
                <textarea
                  type="text"
                  placeholder="Enter Short Description"
                  name="shortDescription"
                  value={shortDescription}
                  className={`form-control ${
                    errors.shortDescription ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setShortDescription(e.target.value)}
                  disabled={view && isUpdate}
                  rows={3}
                />
                {errors.shortDescription && (
                  <div className="invalid-feedback">
                    {errors.shortDescription}
                  </div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Description:</label>
                <textarea
                  type="text"
                  placeholder="Enter Description"
                  name="description"
                  value={description}
                  className={`form-control ${
                    errors.description ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={view && isUpdate}
                  rows={5}
                />
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Category:</label>
                <input
                  type="text"
                  placeholder="Enter Category"
                  name="description"
                  value={category}
                  className={`form-control ${
                    errors.category ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={view && isUpdate}
                />
                {errors.category && (
                  <div className="invalid-feedback">{errors.category}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Price:</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Enter Price"
                  name="price"
                  value={price}
                  className={`form-control ${errors.price ? "is-invalid" : ""}`}
                  onChange={(e) => setPrice(e.target.value)}
                  disabled={view && isUpdate}
                />
                {errors.price && (
                  <div className="invalid-feedback">{errors.price}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Status:</label>
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="status"
                    checked={status}
                    className="form-check-input"
                    onChange={(e) => setStatus(e.target.checked)}
                    disabled={view && isUpdate}
                  />
                  <label className="form-check-label">
                    {status ? "Active" : "Inactive"}
                  </label>
                </div>
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Destination:</label>
                <select
                  name="destinationId"
                  value={destinationId}
                  className={`form-control ${
                    errors.destinationId ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setDestinationId(e.target.value)}
                  disabled={view && isUpdate}
                >
                  <option value="">Select destination</option>
                  {destinations.map((destination) => (
                    <option key={destination.id} value={destination.id}>
                      {destination.name}
                    </option>
                  ))}
                </select>
                {errors.destinationId && (
                  <div className="invalid-feedback">{errors.destinationId}</div>
                )}
              </div>
              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-success"
                  onClick={saveOrUpdateService}
                >
                  {view && isUpdate ? "Update" : "Submit"}
                </button>
                <button className="btn btn-warning" onClick={backToList}>
                  Back
                </button>
              </div>
              {apiError && (
                <div className="alert alert-danger mt-2">{apiError}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceComponent;
