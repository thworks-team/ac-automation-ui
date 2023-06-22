import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import './Sites.css';
import './../../index.css'
import { getRequest, postRequest } from "../../utils/apiHelper";

const City = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  const [region, setRegion] = useState("");
  const [pincode, setPincode] = useState("");
  const [categories, setCategories] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await getRequest('/sites');
        const cityResponse = await getRequest('/city');
        setLoading(false);
        setCategories(response.data.data);
        setCity(cityResponse.data.data)
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }
    fetchData();

  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedCity.trim() === "") return; // Fail proof: don't add empty names
    if (editingIndex === -1) {
      setLoading(true);
      const response = await postRequest('/sites', { name: name, city: selectedCity, region: region, pincode: pincode });
      setLoading(false);
      setCategories([...categories, response.data.data]);
    } else {
      let id = categories[editingIndex]['_id'];
      setLoading(true);
      const response = await postRequest(`/sites/${id}`, { name: name, city: selectedCity, region: region, pincode: pincode });
      setLoading(false);
      console.log(response);
      const updatedCategories = [...categories];
      updatedCategories[editingIndex].name = name;
      updatedCategories[editingIndex].city = selectedCity;
      updatedCategories[editingIndex].region = region;
      updatedCategories[editingIndex].pincode = pincode;
      setCategories(updatedCategories);
      setEditingIndex(-1);
    }
    setName("");
    setSelectedCity("");
    setRegion("");
    setPincode("");
  };

  const handleEdit = (index) => {
    setName(categories[index].name);
    setSelectedCity(categories[index].city);
    setRegion(categories[index].region);
    setPincode(categories[index].pincode);
    setEditingIndex(index);
  };

  const handleDelete = async (index, category) => {
    setLoading(true);
    await postRequest(`/sites/delete/${category['_id']}`, {});
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
    setName("");
    setSelectedCity("");
    setRegion("");
    setPincode("");
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
                      Name
                    </label>
                    <input
                      className="form-control mt-3"
                      type="text"
                      id="name"
                      value={editingIndex === -1 ? name : null}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                      required=""
                    />
                    <label className="font-weight-bold" htmlFor="city">
                      City
                    </label>
                    {/* <input
                    className="form-control mt-3"
                    type="text"
                    id="city"
                    value={editingIndex === -1 ? city : null}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    required=""
                  /> */}
                    {console.log(city)}
                    <select class="form-select" id="city" aria-label="Default select example" onChange={(e) => setSelectedCity(e.target.value)}>
                      <option selected style={{ backgroundColor: 'lightgrey' }} value={null} > -- Select City -- </option>
                      {city?.map(item => {
                        return <option value={item['_id']}>{item.name}</option>
                      })}
                    </select>
                    <label className="font-weight-bold" htmlFor="city">
                      Region
                    </label>
                    <input
                      className="form-control mt-3"
                      type="text"
                      id="region"
                      value={editingIndex === -1 ? region : null}
                      onChange={(e) => setRegion(e.target.value)}
                      placeholder="Region"
                      required=""
                    />
                    <label className="font-weight-bold" htmlFor="city">
                      Pincode
                    </label>
                    <input
                      className="form-control mt-3"
                      type="text"
                      id="Pincode"
                      value={editingIndex === -1 ? pincode : null}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="Pincode"
                      required=""
                    />
                    <div>
                      <button
                        type="submit"
                        className="btn btn-primary m-3 mx-4 px-4"
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
                <div className="card-header">Sites List</div>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">City</th>
                      <th scope="col">Region</th>
                      <th scope="col">Pincode</th>
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
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          ) : (
                            category.name
                          )}
                        </td>
                        <td>
                          {editingIndex === index ? (
                            // <input
                            //   type="text"
                            //   className="form-control"
                            //   value={city}
                            //   onChange={(e) => setCity(e.target.value)}
                            // />
                            <select class="form-select" id="city" aria-label="Default select example" onChange={(e) => setSelectedCity(e.target.value)}>
                              {city?.map(item => {
                                return <option value={item['_id']}>{item.name}</option>
                              })}
                            </select>
                          ) : (
                            city.find(item => item['_id'] === category.city)?.name
                          )}
                        </td>
                        <td>
                          {editingIndex === index ? (
                            <input
                              type="text"
                              className="form-control"
                              value={region}
                              onChange={(e) => setRegion(e.target.value)}
                            />
                          ) : (
                            category.region
                          )}
                        </td>
                        <td>
                          {editingIndex === index ? (
                            <input
                              type="text"
                              className="form-control"
                              value={pincode}
                              onChange={(e) => setPincode(e.target.value)}
                            />
                          ) : (
                            category.pincode
                          )}
                        </td>
                        <td>
                          {editingIndex === index ? (
                            <>
                              <button
                                type="submit"
                                className="btn btn-sm btn-primary m-2"
                                onClick={handleSubmit}
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
