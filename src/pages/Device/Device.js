import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import './Device.css';
import { getRequest, postRequest } from "../../utils/apiHelper";
import './../../index.css'

const Device = () => {
  const [deviceType, setDeviceType] = useState([]);
  const [selectedDeviceType, setSelectedDeviceType] = useState(null);
  const [gateway, setGateway] = useState([]);
  const [selectedGateway, setSelectedGateway] = useState(null);
  const [nodeId, setNodeId] = useState(null);
  const [deviceCategory, setDeviceCategory] = useState([]);
  const [selectedDeviceCategory, setSelectedDeviceCategory] = useState(null);
  const [name, setName] = useState(null);
  const [location, setLocation] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [brandModel, setBrandModel] = useState(null);
  const [categories, setCategories] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!loading) {
      async function fetchData() {
        try {
          setLoading(true);
          const res = await Promise.all([
            getRequest('/device'),
            getRequest('/deviceType'),
            getRequest('/deviceCategory'),
            getRequest('/gateway'),
            getRequest('/schedule'),
          ]);
          setLoading(false);
          const data = res.map((res) => res.data.data);
          // const deviceResponse = await getRequest('/device');
          // const deviceTypeResponse = await getRequest('/deviceType');
          // const deviceCategoryResponse = await getRequest('/deviceCategory');
          // const gatewayResponse = await getRequest('/gateway');
          // const scheduleResponse = await getRequest('/schedule');
          setCategories(data[0]);
          setDeviceType(data[1]);
          setDeviceCategory(data[2]);
          setGateway(data[3]);
          setSchedule(data[4]);
        } catch (error) {
          setLoading(false);
          setError(true);
        }
      }
      fetchData();
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (city.trim() === "") return; // Fail proof: don't add empty names
    let data = {
      deviceTypeId: selectedDeviceType,
      deviceCategoryId: selectedDeviceCategory,
      nodeId: nodeId,
      gatewayId: selectedGateway,
      name: name,
      location: location,
      scheduleId: selectedSchedule,
      brandModel: brandModel
    }
    if (editingIndex === -1) {
      setLoading(true);
      const response = await postRequest('/device', data);
      setLoading(false);
      setCategories([...categories, response.data.data]);
    } else {
      let id = categories[editingIndex]['_id'];
      setLoading(true);
      await postRequest(`/device/${id}`, data);
      setLoading(false);
      const updatedCategories = [...categories];
      updatedCategories[editingIndex].deviceTypeId = selectedDeviceType;
      updatedCategories[editingIndex].gatewayId = selectedGateway;
      updatedCategories[editingIndex].nodeId = nodeId;
      updatedCategories[editingIndex].deviceCategoryId = selectedDeviceCategory;
      updatedCategories[editingIndex].name = name;
      updatedCategories[editingIndex].location = location;
      updatedCategories[editingIndex].scheduleId = selectedSchedule;
      updatedCategories[editingIndex].brandModel = brandModel;
      setCategories(updatedCategories);
      setEditingIndex(-1);
    }
    setSelectedDeviceType("");
    setSelectedGateway("");
    setNodeId("");
    setSelectedDeviceCategory("");
    setName("");
    setLocation("");
    setSelectedSchedule("");
    setBrandModel("");
  };

  const handleEdit = (index) => {
    setSelectedDeviceType(categories[index].deviceTypeId);
    setSelectedGateway(categories[index].gatewayId);
    setNodeId(categories[index].nodeId);
    setSelectedDeviceCategory(categories[index].deviceCategoryId);
    setName(categories[index].name);
    setLocation(categories[index].location);
    setSelectedSchedule(categories[index].scheduleId);
    setBrandModel(categories[index].brandModel);
    // setName(categories[index].name);
    // setCity(categories[index].city);
    // setRegion(categories[index].region);
    // setPincode(categories[index].pincode);
    setEditingIndex(index);
  };

  const handleDelete = async (index, category) => {
    setLoading(true);
    await postRequest(`/device/delete/${category['_id']}`, {});
    setLoading(false);
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
    if (editingIndex === index) {
      setEditingIndex(-1);
    } else if (editingIndex > index) {
      setEditingIndex(editingIndex - 1);
    }
  };

  const enableSubmit = () => {
    let enable = true;
    if (selectedDeviceCategory && selectedDeviceType && selectedGateway && selectedSchedule && name && location && nodeId && brandModel) {
      enable = false;
    }
    return enable;
  }

  return (
    <div className="main">
      {loading ?
        <div className="loaderContainer">
          <div class="loader"></div>
        </div>
        :
        error ? <div className="warningMessage">Something went wrong.. Please try again !!</div> :
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
                      {/* <input
                    className="form-control mt-3"
                    type="text"
                    id="deviceType"
                    value={editingIndex === -1 ? deviceType : null}
                    onChange={(e) => setDeviceType(e.target.value)}
                    placeholder="Device Type"
                    required=""
                  /> */}
                      <select class="form-select" id="city" required onChange={(e) => setSelectedDeviceType(e.target.value)}>
                        <option selected style={{ backgroundColor: 'lightgrey' }} value={null} > -- Select Device Type --</option>
                        {deviceType?.map((item, index) => {
                          return <option value={item['_id']}>{item.name}</option>
                        })}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="font-weight-bold" htmlFor="city">
                        Gateway
                      </label>
                      {/* <input
                    className="form-control mt-3"
                    type="text"
                    id="gateway"
                    value={editingIndex === -1 ? gateway : null}
                    onChange={(e) => setGateway(e.target.value)}
                    placeholder="Gateway"
                    required=""
                  /> */}
                      <select class="form-select" id="city" onChange={(e) => setSelectedGateway(e.target.value)}>
                        <option selected style={{ backgroundColor: 'lightgrey' }} value={null} > -- Select Gateway --</option>
                        {gateway?.map(item => {
                          return <option value={item['_id']}>{item.name}</option>
                        })}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="font-weight-bold" htmlFor="city">
                        Node-Id
                      </label>
                      <input
                        className="form-control mt-3"
                        type="text"
                        id="nodeId"
                        value={editingIndex === -1 ? nodeId : null}
                        onChange={(e) => setNodeId(e.target.value)}
                        placeholder="Node-Id"
                        required=""
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="font-weight-bold" htmlFor="city">
                        Device Category
                      </label>
                      {/* <input
                        className="form-control mt-3"
                        type="text"
                        id="deviceCategory"
                        value={editingIndex === -1 ? deviceCategory : null}
                        onChange={(e) => setDeviceCategory(e.target.value)}
                        placeholder="Device Category"
                        required=""
                      /> */}
                      <select class="form-select  mt-3" id="city" onChange={(e) => setSelectedDeviceCategory(e.target.value)}>
                        <option selected style={{ backgroundColor: 'lightgrey' }} value={null} > -- Select Device Category --</option>
                        {deviceCategory?.map(item => {
                          return <option value={item['_id']}>{item.name}</option>
                        })}
                      </select>
                    </div>
                    <div className="col-md-6">
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
                    </div>
                    <div className="col-md-6">
                      <label className="font-weight-bold" htmlFor="city">
                        Location
                      </label>
                      <input
                        className="form-control mt-3"
                        type="text"
                        id="location"
                        value={editingIndex === -1 ? location : null}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Location"
                        required=""
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="font-weight-bold" htmlFor="city">
                        Schedule
                      </label>
                      <select class="form-select mt-3" id="city" required onChange={(e) => setSelectedSchedule(e.target.value)}>
                        <option selected style={{ backgroundColor: 'lightgrey' }} value={null} > -- Select Schedule -- </option>
                        {schedule?.map((item, index) => {
                          return <option value={item['_id']}>{item.name}</option>
                        })}
                      </select>
                      {/* <input
                        className="form-control mt-3"
                        type="text"
                        id="schedule"
                        value={editingIndex === -1 ? selectedSchedule : null}
                        onChange={(e) => setSchedule(e.target.value)}
                        placeholder="Schedule"
                        required=""
                      /> */}
                    </div>
                    <div className="col-md-6">
                      <label className="font-weight-bold" htmlFor="city">
                        Brand Model
                      </label>
                      <input
                        className="form-control mt-3"
                        type="text"
                        id=" brandModel"
                        value={editingIndex === -1 ? brandModel : null}
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
              <div className="card-header">Device List</div>
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
                          <select class="form-select" id="city" required onChange={(e) => setSelectedDeviceType(e.target.value)}>
                            {deviceType?.map((item, index) => {
                              return <option selected={item['_id'] === category?.deviceCategoryId['_id']} value={item['_id']}>{item.name}</option>
                            })}
                          </select>
                        ) : (
                          deviceType.find(item => item['_id'] === category.deviceTypeId)?.name
                          // category.deviceTypeId?.name
                        )}
                      </td>
                      <td>
                        {editingIndex === index ? (
                          <select class="form-select" id="city" onChange={(e) => setSelectedGateway(e.target.value)}>
                            {gateway?.map(item => {
                              return <option selected={item['_id'] === category?.gatewayId['_id']} value={item['_id']}>{item.name}</option>
                            })}
                          </select>
                        ) : (
                          gateway.find(item => item['_id'] === category.gatewayId)?.name
                          // category.gatewayId?.name
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
                          <select class="form-select  mt-3" id="city" onChange={(e) => setSelectedDeviceCategory(e.target.value)}>
                            {deviceCategory?.map(item => {
                              return <option selected={item['_id'] === category?.deviceCategoryId['_id']} value={item['_id']}>{item.name}</option>
                            })}
                          </select>
                        ) : (
                          // category.deviceCategoryId?.name
                          deviceCategory.find(item => item['_id'] === category.deviceCategoryId)?.name
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
                          <select class="form-select mt-3" id="city" required onChange={(e) => setSelectedSchedule(e.target.value)}>
                            {schedule?.map((item, index) => {
                              return <option selected={item['_id'] === category?.deviceCategoryId['_id']} value={item['_id']}>{item.name}</option>
                            })}
                          </select>
                        ) : (
                          schedule.find(item => item['_id'] === category.scheduleId)?.name
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

export default Device;
