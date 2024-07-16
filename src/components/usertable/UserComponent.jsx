import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../api/userApi";

const UserComponent = () => {
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [role, setRole] = useState("");
  const [view, setView] = useState(true);

  const { id } = useParams();

  const [errors, setErrors] = useState({
    fullname: "",
    address: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    role: "",
  });

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getUser(id)
        .then((response) => {
          setFullname(response.data.content.fullname);
          setAddress(response.data.content.address);
          setEmail(response.data.content.email);
          setPhone(response.data.content.phone);
          setGender(response.data.content.gender);
          setDob(response.data.content.dob);
          setRole(response.data.content.role);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  //   function saveOrUpdateCity(e) {
  //     e.preventDefault();

  //     if (validateForm()) {
  //       const city = { name, code };
  //       console.log(city);

  //       if (id) {
  //         updateCity(id, city)
  //           .then((response) => {
  //             console.log(response.data);
  //             navigator("/city");
  //           })
  //           .catch((error) => {
  //             console.error(error);
  //           });
  //       } else {
  //         createCity(city)
  //           .then((response) => {
  //             console.log(response.data);
  //             navigator("/city");
  //           })
  //           .catch((error) => {
  //             console.error(error);
  //           });
  //       }
  //     }
  //   }

  //   function validateForm() {
  //     let valid = true;
  //     const errorsCopy = { ...errors };

  //     if (name.trim()) {
  //       errorsCopy.name = "";
  //     } else {
  //       errorsCopy.name = "Name is required";
  //       valid = false;
  //     }

  //     if (code.trim()) {
  //       errorsCopy.code = "";
  //     } else {
  //       errorsCopy.code = "City Code is required";
  //       valid = false;
  //     }

  //     setErrors(errorsCopy);

  //     return valid;
  //   }

  //   function pageTitle() {
  //     if (id) {
  //       return <h2 className="text-center">Update City</h2>;
  //     } else {
  //       return <h2 className="text-center">Add New City</h2>;
  //     }
  //   }

  const backToList = () => {
    navigator("/user");
  };

  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h2 className="text-center">User Profile</h2>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Fullname:</label>
                <input
                  type="text"
                  //   placeholder="Enter Full Name"
                  name="name"
                  value={fullname}
                  className={`form-control ${
                    errors.fullname ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setFullname(e.target.value)}
                  disabled={view}
                />
                {errors.fullname && (
                  <div className="invalid-feedback">{errors.fullname}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Address:</label>
                <input
                  type="text"
                  //   placeholder="Enter Address"
                  name="address"
                  value={address}
                  className={`form-control ${
                    errors.address ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={view}
                />
                {errors.address && (
                  <div className="invalid-feedback">{errors.address}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Email:</label>
                <input
                  type="text"
                  //   placeholder="Enter Email"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={view}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Phone:</label>
                <input
                  type="text"
                  //   placeholder="Enter Phone"
                  name="phone"
                  value={phone}
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={view}
                />
                {errors.phone && (
                  <div className="invalid-feedback">{errors.phone}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Gender:</label>
                <input
                  type="text"
                  //   placeholder="Enter Gender"
                  name="Gender"
                  value={gender}
                  className={`form-control ${
                    errors.gender ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setGender(e.target.value)}
                  disabled={view}
                />
                {errors.gender && (
                  <div className="invalid-feedback">{errors.gender}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Date of Birth:</label>
                <input
                  type="text"
                  //   placeholder="Enter Date of Birth"
                  name="dob"
                  value={dob}
                  className={`form-control ${errors.dob ? "is-invalid" : ""}`}
                  onChange={(e) => setFullname(e.target.value)}
                  disabled={view}
                />
                {errors.dob && (
                  <div className="invalid-feedback">{errors.dob}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Role:</label>
                <input
                  type="text"
                  //   placeholder="Enter Role"
                  name="role"
                  value={role}
                  className={`form-control ${errors.role ? "is-invalid" : ""}`}
                  onChange={(e) => setFullname(e.target.value)}
                  disabled={view}
                />
                {errors.role && (
                  <div className="invalid-feedback">{errors.role}</div>
                )}
              </div>

              <div className="d-flex justify-content-between">
                {/* <button className="btn btn-success" onClick={saveOrUpdateCity}>
                  Submit
                </button> */}
                <button className="btn btn-warning" onClick={backToList}>
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComponent;
