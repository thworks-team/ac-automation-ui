import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import './Device.css';
import { getRequest, postRequest } from "../../utils/apiHelper";

const Device = () => {
  const [device, setDevice] = useState("");
  const [deviceType, setDeviceType] = useState([]);
  const [selectedDeviceType, setSelectedDeviceType] = useState("");
  const [gateway, setGateway] = useState([]);
  const [selectedGateway, setSelectedGateway] = useState("");
  const [nodeId, setNodeId] = useState("");
  const [deviceCategory, setDeviceCategory] = useState([]);
  const [selectedDeviceCategory, setSelectedDeviceCategory] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState("6491da395d6666bc1c78e2cd");
  const [brandModel, setBrandModel] = useState("");
  const [categories, setCategories] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      async function fetchData() {
        setLoading(true);
        // const res = await Promise.all([
        //   getRequest('/device'),
        //   getRequest('/deviceType'),
        //   getRequest('/deviceCategory'),
        //   getRequest('/gateway'),
        //   getRequest('/schedule'),
        // ]);
        // const data = res.map((res) => res.data.data);
        // console.log(data.flat());

        const deviceResponse = await getRequest('/device');
        const deviceTypeResponse = await getRequest('/deviceType');
        const deviceCategoryResponse = await getRequest('/deviceCategory');
        const gatewayResponse = await getRequest('/gateway');
        // const scheduleResponse = await getRequest('/schedule');
        setDeviceType(deviceTypeResponse.data.data)
        setDeviceCategory(deviceCategoryResponse.data.data)
        setGateway(gatewayResponse.data.data)
        // setSchedule(scheduleResponse.data.data)
        setLoading(false);
        setCategories(deviceResponse.data.data);
      }
      fetchData();
    }
  }, [])

  const handleSubmit = async(e) => {
    e.preventDefault();
    // if (city.trim() === "") return; // Fail proof: don't add empty names
    if (editingIndex === -1) {
      let data = {
        deviceTypeId: selectedDeviceType,
        deviceCategoryId: selectedDeviceCategory ,
        nodeId: nodeId,
        gatewayId: setSelectedGateway, 
        name: name,
        location: location,
        scheduleId: selectedSchedule,
        brandModel: brandModel 
    }
    setLoading(true);
    const response = await postRequest('/device', data);
    setLoading(false);
    setCategories([...categories, response.data.data]);
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
      {loading ?
        <div class="text-center mt-4">
          <span >Loading...</span>
          <div class="spinner-border" role="status">
          </div>
        </div>
        :
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
                      {console.log('dtt', deviceType)}
                      <select class="form-select" id="city" aria-label="Default select example" onChange={(e) => setSelectedDeviceType(e.target.value)}>
                        {deviceType?.map((item,index) => {
                          return <option selected={index === 0} value={item['_id']}>{item.name}</option>
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
                      <select class="form-select" id="city" aria-label="Default select example" onChange={(e) => setSelectedGateway(e.target.value)}>
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
                      <select class="form-select  mt-3" id="city" aria-label="Default select example" onChange={(e) => setSelectedDeviceCategory(e.target.value)}>
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
                      <input
                        className="form-control mt-3"
                        type="text"
                        id="schedule"
                        value={editingIndex === -1 ? schedule : null}
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
                          <input
                            type="text"
                            className="form-control"
                            value={deviceType}
                            onChange={(e) => setDeviceType(e.target.value)}
                          />
                        ) : (
                          deviceType.find(item => item['_id'] === category.deviceTypeId)?.name
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
                          gateway.find(item => item['_id'] === category.gatewayId)?.name
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
                          // category.deviceCategory
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
      }
    </div>
  );
};

export default Device;
