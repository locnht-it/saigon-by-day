import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { createCity, getCity, updateCity } from "../../api/cityApi";

const CityComponent = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const { id } = useParams();

  const [errors, setErrors] = useState({
    name: "",
    code: "",
  });

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getCity(id)
        .then((response) => {
          setName(response.data.content.name);
          setCode(response.data.content.code);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  function saveOrUpdateCity(e) {
    e.preventDefault();

    if (validateForm()) {
      const city = { name, code };
      console.log(city);

      if (id) {
        updateCity(id, city)
          .then((response) => {
            console.log(response.data);
            navigator("/city");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createCity(city)
          .then((response) => {
            console.log(response.data);
            navigator("/city");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (name.trim()) {
      errorsCopy.name = "";
    } else {
      errorsCopy.name = "Name is required";
      valid = false;
    }

    if (code.trim()) {
      errorsCopy.code = "";
    } else {
      errorsCopy.code = "City Code is required";
      valid = false;
    }

    setErrors(errorsCopy);

    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update City</h2>;
    } else {
      return <h2 className="text-center">Add New City</h2>;
    }
  }

  const backToList = () => {
    navigator("/city");
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
                  placeholder="Enter City Name"
                  name="name"
                  value={name}
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">City Code:</label>
                <input
                  type="text"
                  placeholder="Enter City Code"
                  name="code"
                  value={code}
                  className={`form-control ${errors.code ? "is-invalid" : ""}`}
                  onChange={(e) => setCode(e.target.value)}
                />
                {errors.code && (
                  <div className="invalid-feedback">{errors.code}</div>
                )}
              </div>

              <div className="d-flex justify-content-between">
                <button className="btn btn-success" onClick={saveOrUpdateCity}>
                  Submit
                </button>
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

export default CityComponent;
