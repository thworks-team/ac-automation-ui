import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import './City.css';
import { getRequest, postRequest } from './../../utils/apiHelper';
import './../../index.css'

const City = () => {
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState(null);
  const [code, setCode] = useState(null);
  const [categories, setCategories] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await getRequest('/city');
        setLoading(false);
        setCategories(response.data.data);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }
    fetchData();

  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (city.trim() === "") return; // Fail proof: don't add empty names
    if (editingIndex === -1) {
      setLoading(true);
      const response = await postRequest('/city', { name: city, code: code });
      setLoading(false);
      setCategories([...categories, response.data.data]);
    } else {
      let id = categories[editingIndex]['_id'];
      setLoading(true);
      await postRequest(`/city/${id}`, { name: city, code: code });
      setLoading(false);
      const updatedCategories = [...categories];
      updatedCategories[editingIndex].name = city;
      updatedCategories[editingIndex].code = code;
      setCategories(updatedCategories);
      setEditingIndex(-1);
    }
    setCity("");
    setCode("");
  };

  const handleEdit = async (index) => {
    setCity(categories[index].name);
    setCode(categories[index].code);
    setEditingIndex(index);
  };

  const handleDelete = async (index, category) => {
    setLoading(true);
    await postRequest(`/city/delete/${category['_id']}`, {});
    setLoading(false);
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
    if (editingIndex === index) {
      setEditingIndex(-1);
    } else if (editingIndex > index) {
      setEditingIndex(editingIndex - 1);
    }
  };

  const clearEditing = () => {
    setEditingIndex(-1);
    setCity("");
    setCode("");
  }

  const enableSubmit = () => {
    let enable = true;
    if (city && code) {
      enable = false;
    }
    return enable;
  }

  return (
    <div className="main">
      {
        loading ?
          <div className="loaderContainer">
            <div class="loader"></div>
          </div>
          :
        error ? <div className="warningMessage">Something went wrong.. Please try again !!</div> :
          <div className="row">
            <div className="col-md-4">
              <div className="card m-5" style={{ width: "18rem" }}>
                <div className="card-header">City</div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <label className="font-weight-bold" htmlFor="city">
                      City
                    </label>
                    <input
                      className="form-control mt-3"
                      type="text"
                      id="city"
                      value={editingIndex === -1 ? city : null}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Name"
                      required=""
                    />
                    <label className="font-weight-bold" htmlFor="city">
                      Code
                    </label>
                    <input
                      className="form-control mt-3"
                      type="text"
                      id="city"
                      value={editingIndex === -1 ? code : null}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Code"
                      required=""
                    />
                    <div>
                      <button
                        type="submit"
                        className="btn btn-primary m-3 mx-4 px-4"
                        disabled={enableSubmit()}
                      >
                        {"Add"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card m-5">
                <div className="card-header">Cities</div>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">City</th>
                      <th scope="col">Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category, index) => (
                      <tr key={index}>
                        <td>
                          {editingIndex === index ? (
                            <input
                              type="text"
                              className="form-control"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                            />
                          ) : (
                            category.name
                          )}
                        </td>
                        <td>
                          {editingIndex === index ? (
                            <input
                              type="text"
                              className="form-control"
                              value={code}
                              onChange={(e) => setCode(e.target.value)}
                            />
                          ) : (
                            category.code
                          )}
                        </td>
                        <td>
                          {editingIndex === index ? (
                            <>
                              <button
                                type="submit"
                                className="btn btn-sm btn-primary m-2"
                                onClick={(e) => handleSubmit(e, category)}
                              >
                                <i class="fa-solid fa-check"></i>
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm btn-secondary m-2"
                                onClick={() => clearEditing()}
                              >
                                <i class="fa-solid fa-ban"></i>
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                className="btn btn-sm btn-primary m-2"
                                onClick={() => handleEdit(index)}
                                disabled={editingIndex !== -1}
                              >
                                <i class="fas fa-edit"></i>
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm btn-danger m-2"
                                onClick={() => handleDelete(index, category)}
                                disabled={editingIndex !== -1}
                              >
                                <i class="fa-solid fa-xmark"></i>
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
      }
    </div>
  );
};

export default City;
