import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import './DeviceCategory.css';

const DeviceCategory = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") return; // Fail proof: don't add empty names
    if (editingIndex === -1) {
      setCategories([...categories, { name: name }]);
    } else {
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

  const handleDelete = (index) => {
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
      <div className="row">
        <div className="col-md-4">
          <div className="card m-5" style={{ width: "18rem" }}>
            <div className="card-header">Device Category</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <label className="font-weight-bold" htmlFor="name">
                  Name
                </label>
                <input
                  className="form-control mt-3"
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  required=""
                />
                <div>
                  <button
                    type="submit"
                    className="btn btn-primary m-3 mx-4 px-4"
                  >
                    {editingIndex === -1 ? "Add" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card m-5">
            <div className="card-header">Device Categories</div>
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
                            onClick={() => handleDelete(index)}
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
    </div>
  );
};

export default DeviceCategory;
