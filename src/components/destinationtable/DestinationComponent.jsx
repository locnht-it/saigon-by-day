import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createDestination,
  getDestination,
  updateDestination,
} from "../../api/destinationApi";
import { listCities } from "../../api/cityApi";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { imageDb } from "../../FirebaseImage/Config";
import {
  createGallery,
  getGalleryByDestinationId,
  updateGallery,
} from "../../api/galleryApi";

const DestinationComponent = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [activities, setActivities] = useState("");
  const [status, setStatus] = useState(false);
  const [cityId, setCityId] = useState("");
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [galleryId, setGalleryId] = useState("");
  const [imageNo1, setImageNo1] = useState("");
  const [imageNo2, setImageNo2] = useState("");
  const [imageNo3, setImageNo3] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [view, setView] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setIsUpdate(true);
      getDestination(id)
        .then((response) => {
          const destination = response.data.content;
          setName(destination.name);
          setAddress(destination.address);
          setShortDescription(destination.shortDescription);
          setDescription(destination.description);
          setActivities(destination.activities);
          setStatus(destination.status);
          setCityId(destination.cityId);
          setGalleryId(destination.galleryId);
          getGalleryByDestinationId(id).then((response) => {
            const gallery = response.data.content;
            setImageNo1(gallery.imageNo1);
            setImageNo2(gallery.imageNo2);
            setImageNo3(gallery.imageNo3);
          });
          setView(true); // Khi load dữ liệu thành công, cho phép chỉnh sửa
        })
        .catch((error) => {
          console.error(error);
        });
    }

    listCities(1, 100)
      .then((response) => {
        setCities(response.data.content);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files).slice(0, 3); // Chỉ cho phép chọn tối đa 3 ảnh
    const urls = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const img = files[i];
        const imgRef = ref(imageDb, `files/${uuidv4()}`);
        const snapshot = await uploadBytes(imgRef, img);
        const downloadURL = await getDownloadURL(snapshot.ref);
        urls.push(downloadURL);
      }

      console.log("Download URLs after upload:", urls);

      // Cập nhật state cho imageNo1, imageNo2, imageNo3
      if (urls.length >= 1) setImageNo1(urls[0]);
      if (urls.length >= 2) setImageNo2(urls[1]);
      if (urls.length >= 3) setImageNo3(urls[2]);

      // Gộp thành object gallery sau khi state đã được cập nhật
      setGalleryState(urls);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const setGalleryState = (urls) => {
    const gallery = {
      imageNo1: urls[0] || "",
      imageNo2: urls[1] || "",
      imageNo3: urls[2] || "",
    };

    console.log("Gallery object being sent to API:", gallery);

    if (galleryId) {
      const gallery = {
        imageNo1: urls[0] || imageNo1,
        imageNo2: urls[1] || imageNo2,
        imageNo3: urls[2] || imageNo3,
      };

      updateGallery(galleryId, gallery)
        .then((response) => {
          console.log("Gallery updated successfully!", response.data);
          setGalleryId(response.data.content.id);
        })
        .catch((error) => {
          console.error("Failed to update gallery:", error);
        });
    } else {
      createGallery(gallery)
        .then((response) => {
          console.log("Gallery created successfully!", response.data);
          setGalleryId(response.data.content.id); // Set lại galleryId nhận được từ backend
        })
        .catch((error) => {
          console.error("Failed to create gallery:", error);
        });
    }
  };

  const saveOrUpdateDestination = (e) => {
    e.preventDefault();
    setApiError("");

    if (validateForm()) {
      const destination = {
        name,
        address,
        shortDescription,
        description,
        activities,
        status,
        cityId,
        galleryId,
      };

      if (id) {
        if (!view) {
          updateDestination(id, destination)
            .then((response) => {
              console.log(response.data);
              navigate("/destination");
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          setView(false);
        }
      } else {
        createDestination(destination)
          .then((response) => {
            console.log(response.data);
            navigate("/destination");
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
    if (!address.trim()) errorsCopy.address = "Address is required";
    if (!shortDescription.trim())
      errorsCopy.shortDescription = "Short Description is required";
    if (!description.trim()) errorsCopy.description = "Description is required";
    if (!activities.trim()) errorsCopy.activities = "Activities are required";
    if (!cityId) errorsCopy.cityId = "City is required";

    setErrors(errorsCopy);

    return Object.keys(errorsCopy).length === 0;
  };

  const pageTitle = () => {
    return (
      <h2 className="text-center">
        {id ? "Update Destination" : "Add New Destination"}
      </h2>
    );
  };

  const backToList = () => {
    navigate("/destination");
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
                  placeholder="Enter Destination Name"
                  name="name"
                  value={name}
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  onChange={(e) => setName(e.target.value)}
                  disabled={view && isUpdate} // Disable nếu không được phép chỉnh sửa khi đang trong chế độ View
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Address:</label>
                <input
                  type="text"
                  placeholder="Enter Address"
                  name="address"
                  value={address}
                  className={`form-control ${
                    errors.address ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={view && isUpdate}
                />
                {errors.address && (
                  <div className="invalid-feedback">{errors.address}</div>
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
                <label className="form-label">Activities:</label>
                <input
                  type="text"
                  placeholder="Enter Activities"
                  name="activities"
                  value={activities}
                  className={`form-control ${
                    errors.activities ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setActivities(e.target.value)}
                  disabled={view && isUpdate}
                />
                {errors.activities && (
                  <div className="invalid-feedback">{errors.activities}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Images:</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={view && isUpdate}
                />
                {imageNo1 && <img src={imageNo1} alt="img-1" width="200px" />}
                {imageNo2 && <img src={imageNo2} alt="img-2" width="200px" />}
                {imageNo3 && <img src={imageNo3} alt="img-3" width="200px" />}
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
                <label className="form-label">City:</label>
                <select
                  name="cityId"
                  value={cityId}
                  className={`form-control ${
                    errors.cityId ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setCityId(e.target.value)}
                  disabled={view && isUpdate}
                >
                  <option value="">Select city</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
                {errors.cityId && (
                  <div className="invalid-feedback">{errors.cityId}</div>
                )}
              </div>
              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-success"
                  onClick={saveOrUpdateDestination}
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

export default DestinationComponent;
