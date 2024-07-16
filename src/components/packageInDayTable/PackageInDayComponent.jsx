import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { imageDb } from "../../FirebaseImage/Config";
import {
  createPackageInDay,
  getPackageInDay,
  updatePackageInDay,
} from "../../api/packageInDayApi";
import { listPackages } from "../../api/packageApi";

const PackageInDayComponent = () => {
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [code, setCode] = useState("");
  const [numberAttendance, setNumberAttendance] = useState("");
  const [packageId, setPackageId] = useState("");
  const [packages, setPackages] = useState([]);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [image, setImage] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [view, setView] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setIsUpdate(true);
      getPackageInDay(id)
        .then((response) => {
          const packageInDay = response.data.content;
          setDate(formatDate(packageInDay.date));
          setPrice(packageInDay.price);
          setCode(packageInDay.code);
          setNumberAttendance(packageInDay.numberAttendance);
          setPackageId(packageInDay.packageId);
          setImage(packageInDay.image);
          setView(true); // Khi load dữ liệu thành công, cho phép chỉnh sửa
        })
        .catch((error) => {
          console.error(error);
        });
    }

    listPackages(1, 100)
      .then((response) => {
        setPackages(response.data.content);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files).slice(0, 1); // Chỉ cho phép chọn tối đa 1 ảnh
    const urls = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const img = files[i];
        const imgRef = ref(imageDb, `files/${uuidv4()}`);
        const snapshot = await uploadBytes(imgRef, img);
        const downloadURL = await getDownloadURL(snapshot.ref);
        urls.push(downloadURL);
      }
      console.log("Download URL after upload:", urls);
      if (urls.length >= 1) setImage(urls[0]);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const saveOrUpdatePackageInDay = (e) => {
    e.preventDefault();
    setApiError("");

    if (validateForm()) {
      const packageInDay = {
        date,
        price,
        code,
        numberAttendance,
        packageId,
        image, // Ensure the image URL is included in the package data
      };

      if (id) {
        if (!view) {
          updatePackageInDay(id, packageInDay)
            .then((response) => {
              console.log(response.data);
              navigate("/package-in-day");
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          setView(false);
        }
      } else {
        createPackageInDay(packageInDay)
          .then((response) => {
            console.log(response.data);
            navigate("/package-in-day");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };

  const validateForm = () => {
    const errorsCopy = {};

    if (!date) errorsCopy.date = "Date is required";
    if (!price) errorsCopy.price = "Price is required";
    if (!code.trim()) errorsCopy.code = "Code Description is required";
    if (!numberAttendance)
      errorsCopy.numberAttendance = "Number Attendance is required";
    if (!packageId) errorsCopy.packageId = "Package is required";

    setErrors(errorsCopy);

    return Object.keys(errorsCopy).length === 0;
  };

  const pageTitle = () => {
    return (
      <h2 className="text-center">
        {id ? "Update PackageInDay" : "Add New PackageInDay"}
      </h2>
    );
  };

  const backToList = () => {
    navigate("/package-in-day");
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
                <label className="form-label">Package:</label>
                <select
                  name="packageId"
                  value={packageId}
                  className={`form-control ${
                    errors.packageId ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setPackageId(e.target.value)}
                  disabled={view && isUpdate}
                >
                  <option value="">Select package</option>
                  {packages.map((packageEntity) => (
                    <option key={packageEntity.id} value={packageEntity.id}>
                      {packageEntity.name}
                    </option>
                  ))}
                </select>
                {errors.packageId && (
                  <div className="invalid-feedback">{errors.packageId}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Code:</label>
                <input
                  type="text"
                  placeholder="Enter PackageInDay Code"
                  name="code"
                  value={code}
                  className={`form-control ${errors.code ? "is-invalid" : ""}`}
                  onChange={(e) => setCode(e.target.value)}
                  disabled={view && isUpdate}
                />
                {errors.code && (
                  <div className="invalid-feedback">{errors.code}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Date:</label>
                <input
                  type="datetime-local"
                  name="date"
                  value={date}
                  className={`form-control ${errors.date ? "is-invalid" : ""}`}
                  onChange={(e) => setDate(e.target.value)}
                  disabled={view && isUpdate}
                />
                {errors.date && (
                  <div className="invalid-feedback">{errors.date}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Number Attendance:</label>
                <input
                  type="number"
                  step="1"
                  placeholder="Enter Number Attendance"
                  name="numberAttendance"
                  value={numberAttendance}
                  className={`form-control ${
                    errors.numberAttendance ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setNumberAttendance(e.target.value)}
                  disabled={view && isUpdate}
                />
                {errors.numberAttendance && (
                  <div className="invalid-feedback">
                    {errors.numberAttendance}
                  </div>
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
                <label className="form-label">Image:</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={view && isUpdate}
                />
                {image && <img src={image} alt="img-1" width="200px" />}
              </div>

              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-success"
                  onClick={saveOrUpdatePackageInDay}
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

export default PackageInDayComponent;
