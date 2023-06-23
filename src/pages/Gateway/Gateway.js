import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import './Gateway.css';
import { getRequest, postRequest } from "../../utils/apiHelper";
import './../../index.css'

const Gateway = () => {
    const [name, setName] = useState(null);
    const [code, setCode] = useState(null);
    const [mac, setMac] = useState(null);
    const [imei, setImei] = useState(null);
    // const [site, setSite] = useState("");
    const [gateway, setGatewayType] = useState(null);
    const [categories, setCategories] = useState([]);
    // const [sites, setSites] = useState([]);
    const [editingIndex, setEditingIndex] = useState(-1);
    const [loading, setLoading] = useState(false);
    // const [selectedSite, setSelectedSite] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const response = await getRequest('/gateway');
                //   const sitesResponse = await getRequest('/sites');
                setLoading(false);
                setCategories(response.data.data);
                //   setSites(sitesResponse.data.data)
            } catch (error) {
                setLoading(false);
                setError(true);
            }
        }
        fetchData();

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (city.trim() === "") return; // Fail proof: don't add empty names
        if (editingIndex === -1) {
            setLoading(true);
            const response = await postRequest('/gateway', { name: name, code: code, mac: mac, imei: imei, gatewayType: gateway });
            setLoading(false);
            setCategories([...categories, response.data.data]);
        } else {
            let id = categories[editingIndex]['_id'];
            setLoading(true);
            const response = await postRequest(`/gateway/${id}`, { name: name, code: code, mac: mac, imei: imei, gatewayType: gateway });
            setLoading(false);
            const updatedCategories = [...categories];
            updatedCategories[editingIndex].name = name;
            updatedCategories[editingIndex].code = code;
            updatedCategories[editingIndex].mac = mac;
            updatedCategories[editingIndex].imei = imei;
            // updatedCategories[editingIndex].site = site;
            updatedCategories[editingIndex].gatewayType = gateway;
            setCategories(updatedCategories);
            setEditingIndex(-1);
        }
        setName("");
        setCode("");
        setMac("");
        setImei("");
        // setSite("");
        setGatewayType("");
    };

    const handleEdit = (index) => {
        setName(categories[index].name);
        setCode(categories[index].code);
        setMac(categories[index].mac);
        setImei(categories[index].imei);
        // setSite(categories[index].site);
        setGatewayType(categories[index].gatewayType);
        setEditingIndex(index)
    };

    const handleDelete = async (index, category) => {
        setLoading(true);
        await postRequest(`/gateway/delete/${category['_id']}`, {});
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
        if (name && mac && imei && code && gateway) {
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
                            <div className="card m-5" style={{ width: "30rem" }}>
                                <div className="card-header">Add Gateway</div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label className="font-weight-bold" htmlFor="city">
                                                    Gateway Name
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
                                                    Code
                                                </label>
                                                <input
                                                    className="form-control mt-3"
                                                    type="text"
                                                    id="code"
                                                    value={editingIndex === -1 ? code : null}
                                                    onChange={(e) => setCode(e.target.value)}
                                                    placeholder="Code"
                                                    required=""
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="font-weight-bold" htmlFor="city">
                                                    MAC
                                                </label>
                                                <input
                                                    className="form-control mt-3"
                                                    type="text"
                                                    id="mac"
                                                    value={editingIndex === -1 ? mac : null}
                                                    onChange={(e) => setMac(e.target.value)}
                                                    placeholder="MAC"
                                                    required=""
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="font-weight-bold" htmlFor="city">
                                                    IMEI (GSM)
                                                </label>
                                                <input
                                                    className="form-control mt-3"
                                                    type="text"
                                                    id="imei"
                                                    value={editingIndex === -1 ? imei : null}
                                                    onChange={(e) => setImei(e.target.value)}
                                                    placeholder="IMEI (GSM)"
                                                    required=""
                                                />
                                            </div>
                                            {/* <div className="col-md-6">
                                            <label className="font-weight-bold" htmlFor="city">
                                                Site
                                            </label>
                                            <select class="form-select" id="city" aria-label="Default select example" onChange={(e) => setSelectedSite(e.target.value)}>
                                                {sites?.map(item => {
                                                    return <option value={item['_id']}>{item.name}</option>
                                                })}
                                            </select>
                                            <input
                                                className="form-control mt-3"
                                                type="text"
                                                id="name"
                                                value={editingIndex === -1 ? site : null}
                                                onChange={(e) => setSite(e.target.value)}
                                                placeholder="Site"
                                                required=""
                                            />
                                        </div> */}
                                            <div className="col-md-6">
                                                <label className="font-weight-bold" htmlFor="city">
                                                    Gateway Type
                                                </label>
                                                <input
                                                    className="form-control mt-3"
                                                    type="text"
                                                    id="gateway"
                                                    value={editingIndex === -1 ? gateway : null}
                                                    onChange={(e) => setGatewayType(e.target.value)}
                                                    placeholder="Gateway Type"
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
                                <div className="card-header">Gateway Devices</div>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Gateway Name</th>
                                            <th scope="col">Code</th>
                                            <th scope="col">MAC</th>
                                            <th scope="col">IMEI</th>
                                            <th scope="col">Gateway Type</th>
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
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={mac}
                                                            onChange={(e) => setMac(e.target.value)}
                                                        />
                                                    ) : (
                                                        category.mac
                                                    )}
                                                </td>
                                                <td>
                                                    {editingIndex === index ? (
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={imei}
                                                            onChange={(e) => setImei(e.target.value)}
                                                        />
                                                    ) : (
                                                        category.imei
                                                    )}
                                                </td>
                                                <td>
                                                    {editingIndex === index ? (
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={gateway}
                                                            onChange={(e) => setGatewayType(e.target.value)}
                                                        />
                                                    ) : (
                                                        category.gatewayType
                                                    )}
                                                </td>
                                                {/* <td>
                                                {editingIndex === index ? (
                                                    <select class="form-select" id="city" aria-label="Default select example" onChange={(e) => setSelectedSite(e.target.value)}>
                                                        {sites?.map(item => {
                                                            return <option value={item['_id']}>{item.name}</option>
                                                        })}
                                                    </select>
                                                ) : (
                                                    sites.find(item => item['_id'] === category.site)?.name
                                                )}
                                            </td> */}
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

export default Gateway;
