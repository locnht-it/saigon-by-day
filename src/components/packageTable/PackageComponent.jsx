import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { listServices } from "../../api/serviceApi";
import { getPackage, updatePackage, createPackage } from "../../api/packageApi";

const PackageComponent = () => {
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [view, setView] = useState(true);
  const [services, setServices] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [serviceInputs, setServiceInputs] = useState([]);

  useEffect(() => {
    if (id) {
      setIsUpdate(true);
      getPackage(id)
        .then((response) => {
          const packageResponse = response.data.content.packageDTO;
          setName(packageResponse.name);
          setStartTime(convertLongToDateTime(packageResponse.startTime));
          setEndTime(convertLongToDateTime(packageResponse.endTime));
          setShortDescription(packageResponse.shortDescription);
          setDescription(packageResponse.description);
          setStatus(packageResponse.status);
          setView(true);

          // Set serviceInputs with existing services
          const existingServices =
            response.data.content.serviceDestinationDTOS.map((service) => ({
              serviceId: service.id,
              startTimeService: convertLongToDateTime(service.startTime),
              endTimeService: convertLongToDateTime(service.endTime),
              transport: service.transportation,
            }));
          setServiceInputs(existingServices);
        })
        .catch((error) => {
          console.error("Error fetching service:", error);
        });
    }

    listServices(1, 100)
      .then((response) => {
        setServices(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching destinations:", error);
      });
  }, [id]);

  useEffect(() => {
    // Update packageRequestDTO whenever serviceInputs change
    const serviceDestinationDTOS = transformServiceInputs(serviceInputs);
    const packageDTO = {
      name,
      startTime: new Date(startTime).getTime(),
      endTime: new Date(endTime).getTime(),
      shortDescription,
      description,
      status,
    };
    const packageRequestDTO = { packageDTO, serviceDestinationDTOS };
    setPackageRequestDTO(packageRequestDTO);
  }, [
    serviceInputs,
    name,
    startTime,
    endTime,
    shortDescription,
    description,
    status,
  ]);

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

  const transformServiceInputs = (inputs) => {
    return inputs.map((input) => ({
      id: input.serviceId,
      startTime: convertDateTimeToLong(input.startTimeService),
      endTime: convertDateTimeToLong(input.endTimeService),
      transportation: input.transport,
    }));
  };

  const convertDateTimeToLong = (datetime) => {
    return new Date(datetime).getTime();
  };

  const [packageRequestDTO, setPackageRequestDTO] = useState(null);

  const saveOrUpdatePackage = (e) => {
    e.preventDefault();
    setApiError("");

    if (validateForm()) {
      if (id) {
        if (!view) {
          console.log("Before update package: " + id, packageRequestDTO);
          updatePackage(id, packageRequestDTO)
            .then((response) => {
              console.log(response);
              navigate("/package");
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          setView(false);
        }
      } else {
        createPackage(packageRequestDTO)
          .then((response) => {
            console.log(response.data);
            navigate("/package");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };

  const validateForm = () => {
    const errorsCopy = {};

    if (!name.trim()) errorsCopy.name = "Name is required";
    if (!startTime) errorsCopy.startTime = "Start Time is required";
    if (!endTime) errorsCopy.endTime = "End Time is required";
    if (!shortDescription.trim())
      errorsCopy.shortDescription = "Short Description is required";
    if (!description.trim()) errorsCopy.description = "Description is required";

    setErrors(errorsCopy);

    return Object.keys(errorsCopy).length === 0;
  };

  const pageTitle = () => {
    return (
      <h2 className="text-center">
        {id ? "Update Package" : "Add New Package"}
      </h2>
    );
  };

  const backToList = () => {
    navigate("/package");
  };

  const addService = () => {
    const newService = {
      serviceId: "",
      startTimeService: "",
      endTimeService: "",
      transport: "",
    };
    setServiceInputs([...serviceInputs, newService]);
  };

  const deleteService = (index) => {
    const list = [...serviceInputs];
    list.splice(index, 1);
    setServiceInputs(list);
  };

  const handleServiceInputChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...serviceInputs];
    list[index][name] = value;
    setServiceInputs(list);
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
                  placeholder="Enter Package Name"
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
                  name="startTimeService"
                  value={startTime}
                  className={`form-control ${
                    errors.startTime ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setStartTime(e.target.value)}
                  disabled={view && isUpdate}
                />
                {errors.startTime && (
                  <div className="invalid-feedback">{errors.startTime}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">End Time:</label>
                <input
                  type="datetime-local"
                  name="endTimeService"
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

              {serviceInputs.map((input, index) => (
                <div key={index}>
                  <div className="form-group mb-2" id="service">
                    <label className="form-label">Service:</label>
                    <select
                      name="serviceId"
                      value={input.serviceId}
                      className={`form-control`}
                      onChange={(e) => handleServiceInputChange(index, e)}
                      disabled={view && isUpdate}
                    >
                      <option value="">Select service</option>
                      {services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.name} | Start Time:{" "}
                          {convertLongToDateTime(service.startTime)} | End Time:{" "}
                          {convertLongToDateTime(service.endTime)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group mb-2">
                    <label className="form-label">Estimated Start Time:</label>
                    <input
                      type="datetime-local"
                      name="startTimeService"
                      value={input.startTimeService}
                      className={`form-control`}
                      onChange={(e) => handleServiceInputChange(index, e)}
                      disabled={view && isUpdate}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label className="form-label">Estimated End Time:</label>
                    <input
                      type="datetime-local"
                      name="endTimeService"
                      value={input.endTimeService}
                      className={`form-control`}
                      onChange={(e) => handleServiceInputChange(index, e)}
                      disabled={view && isUpdate}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label className="form-label">Transport:</label>
                    <input
                      type="text"
                      placeholder="Enter Transport"
                      name="transport"
                      value={input.transport}
                      className={`form-control`}
                      onChange={(e) => handleServiceInputChange(index, e)}
                      disabled={view && isUpdate}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-danger mb-2"
                    onClick={() => deleteService(index)}
                    disabled={view && isUpdate}
                  >
                    Delete Service
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="btn btn-primary mb-3"
                onClick={addService}
                disabled={view && isUpdate}
              >
                Add Service
              </button>

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

              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-success"
                  onClick={saveOrUpdatePackage}
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

export default PackageComponent;
