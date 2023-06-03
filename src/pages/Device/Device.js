import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import './Device.css';

const Device = () => {
    const [deviceType, setDeviceType] = useState("");
    const [gateway, setGateway] = useState("");
    const [nodeId, setNodeId] = useState("");
    const [deviceCategory, setDeviceCategory] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [schedule, setSchedule] = useState("");
  const [brandModel, setBrandModel] = useState("");
  const [categories, setCategories] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (city.trim() === "") return; // Fail proof: don't add empty names
    if (editingIndex === -1) {
      setCategories([...categories, { deviceType: deviceType, gateway : gateway, nodeId: nodeId, deviceCategory: deviceCategory,  name: name ,  location: location , schedule: schedule, brandModel: brandModel}]);
    } else {
      const updatedCategories = [...categories];
      updatedCategories[editingIndex].deviceType = deviceType;
      updatedCategories[editingIndex].gateway = gateway;
      updatedCategories[editingIndex].nodeId = nodeId;
      updatedCategories[editingIndex].deviceCategory = deviceCategory;
      updatedCategories[editingIndex].name = name;
      updatedCategories[editingIndex].location = location;
      updatedCategories[editingIndex].schedule = schedule;
      updatedCategories[editingIndex].brandModel = brandModel;
      setCategories(updatedCategories);
      setEditingIndex(-1);
    }
    setDeviceType("");
    setGateway("");
    setNodeId("");
    setDeviceCategory("");
    setName("");
    setLocation("");
    setSchedule("");
    setBrandModel("");
  };
console.log('categories',categories)
  const handleEdit = (index) => {
    setDeviceType(categories[index].deviceType);
    setGateway(categories[index].gateway);
    setNodeId(categories[index].nodeId);
    setDeviceCategory(categories[index].deviceCategory);
    setName(categories[index].name);
    setLocation(categories[index].location);
    setSchedule(categories[index].schedule);
    setBrandModel(categories[index].brandModel);
    // setName(categories[index].name);
    // setCity(categories[index].city);
    // setRegion(categories[index].region);
    // setPincode(categories[index].pincode);
    // setEditingIndex(index);
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
          <div className="card m-5" style={{ width: "30rem" }}>
            <div className="card-header">Add Device</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
              <div className="row">
              <div className="col-md-6">
              <label className="font-weight-bold" htmlFor="city">
                  Device Type
                </label>
                <input
                  className="form-control mt-3"
                  type="text"
                  id="deviceType"
                  value={deviceType}
                  onChange={(e) => setDeviceType(e.target.value)}
                  placeholder="Device Type"
                  required=""
                />
                </div>
                <div className="col-md-6">
                <label className="font-weight-bold" htmlFor="city">
                  Gateway
                </label>
                <input
                  className="form-control mt-3"
                  type="text"
                  id="gateway"
                  value={gateway}
                  onChange={(e) => setGateway(e.target.value)}
                  placeholder="Gateway"
                  required=""
                />
                </div>
                <div className="col-md-6">
                <label className="font-weight-bold" htmlFor="city">
                  Node-Id
                </label>
                <input
                  className="form-control mt-3"
                  type="text"
                  id="nodeId"
                  value={nodeId}
                  onChange={(e) => setNodeId(e.target.value)}
                  placeholder="Node-Id"
                  required=""
                />
                </div>
                <div className="col-md-6">
                <label className="font-weight-bold" htmlFor="city">
                  Device Category
                </label>
                <input
                  className="form-control mt-3"
                  type="text"
                  id="deviceCategory"
                  value={deviceCategory}
                  onChange={(e) => setDeviceCategory(e.target.value)}
                  placeholder="Device Category"
                  required=""
                />
                    </div>
                <div className="col-md-6">
                <label className="font-weight-bold" htmlFor="city">
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
                </div>
                <div className="col-md-6">
                <label className="font-weight-bold" htmlFor="city">
                Location
                </label>
                 <input
                  className="form-control mt-3"
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location"
                  required=""
                />
                </div>
                <div className="col-md-6">
                <label className="font-weight-bold" htmlFor="city">
                Schedule
                </label>
                 <input
                  className="form-control mt-3"
                  type="text"
                  id="schedule"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  placeholder="Schedule"
                  required=""
                />
                </div>
                <div className="col-md-6">
                <label className="font-weight-bold" htmlFor="city">
                Brand Model
                </label>
                 <input
                  className="form-control mt-3"
                  type="text"
                  id=" brandModel"
                  value={brandModel}
                  onChange={(e) => setBrandModel(e.target.value)}
                  placeholder=" Brand Model"
                  required=""
                />
                </div>
                </div>
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
            <div className="card-header">Sites List</div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Device Type</th>
                  <th scope="col">Gateway</th>
                  <th scope="col">Node-Id</th>
                  <th scope="col">Device Category</th>
                  <th scope="col">Name</th>
                  <th scope="col">Location</th>
                  <th scope="col">Schedule</th>
                  <th scope="col">Brand Model</th>
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
                          value={deviceType}
                          onChange={(e) => setDeviceType(e.target.value)}
                        />
                      ) : (
                        category.deviceType
                      )}
                    </td>
                    <td>
                      {editingIndex === index ? (
                        <input
                          type="text"
                          className="form-control"
                          value={gateway}
                          onChange={(e) => setGateway(e.target.value)}
                        />
                      ) : (
                        category.gateway
                      )}
                    </td>
                    <td>
                      {editingIndex === index ? (
                        <input
                          type="text"
                          className="form-control"
                          value={nodeId}
                          onChange={(e) => setNodeId(e.target.value)}
                        />
                      ) : (
                        category.nodeId
                      )}
                    </td>
                    <td>
                      {editingIndex === index ? (
                        <input
                          type="text"
                          className="form-control"
                          value={deviceCategory}
                          onChange={(e) => setDeviceCategory(e.target.value)}
                        />
                      ) : (
                        category.deviceCategory
                      )}
                    </td>
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
                        <input
                          type="text"
                          className="form-control"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      ) : (
                        category.location
                      )}
                    </td>
                    <td>
                      {editingIndex === index ? (
                        <input
                          type="text"
                          className="form-control"
                          value={schedule}
                          onChange={(e) => setSchedule(e.target.value)}
                        />
                      ) : (
                        category.schedule
                      )}
                    </td>
                    <td>
                      {editingIndex === index ? (
                        <input
                          type="text"
                          className="form-control"
                          value={brandModel}
                          onChange={(e) => setBrandModel(e.target.value)}
                        />
                      ) : (
                        category.brandModel
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

export default Device;
