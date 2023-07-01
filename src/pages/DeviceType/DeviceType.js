import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import './DeviceType.css';
import { getRequest, postRequest } from "../../utils/apiHelper";
import './../../index.css'

const  DeviceType = () => {
  const [name, setName] = useState(null);
  const [categories, setCategories] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await getRequest('/deviceType');
        setLoading(false);  
        setCategories(response.data.data);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }
    fetchData();
  },[])

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (name.trim() === "") return; // Fail proof: don't add empty names
    if (editingIndex === -1) {
      setLoading(true);
      const response = await postRequest('/deviceType',{ name: name });
      setLoading(false);
      setCategories([...categories, response.data.data]);
    } else {
      let id = categories[editingIndex]['_id'];
      setLoading(true);
      await postRequest(`/deviceType/${id}`,{ name: name });
      setLoading(false);
      const updatedCategories = [...categories];
      updatedCategories[editingIndex].name = name;
      setCategories(updatedCategories);
      setEditingIndex(-1);
    }
    setName("");
  };

  const handleEdit = (index) => {
    setName(categories[index].name);
    setEditingIndex(index);
  };

  const handleDelete = async(index,category) => {
    setLoading(true);
    await postRequest(`/deviceType/delete/${category['_id']}`,{});
    setLoading(false);
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
    if (editingIndex === index) {
      setEditingIndex(-1);
    } else if (editingIndex > index) {
      setEditingIndex(editingIndex - 1);
    }
  };

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
            <div className="card-header">Device Type</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <label className="font-weight-bold" htmlFor="name">
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
                <div>
                  <button
                    type="submit"
                    className="btn btn-primary m-3 mx-4 px-4"
                    disabled ={name ? false : true  }
                  >
                    {"Add" }
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card m-5">
            <div className="card-header">Device Type</div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col"></th>
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
                            onClick={() => setEditingIndex(-1)}
                          >
                            <i class="fa-regular fa-message-slash"></i>
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
                            onClick={() => handleDelete(index,category)}
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

export default DeviceType;
