import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import './Gateway.css';

const Device = () => {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [mac, setMac] = useState("");
    const [imei, setImei] = useState("");
    const [site, setSite] = useState("");
    const [gateway, setGatewayType] = useState("");
    const [categories, setCategories] = useState([]);
    const [editingIndex, setEditingIndex] = useState(-1);

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (city.trim() === "") return; // Fail proof: don't add empty names
        if (editingIndex === -1) {
            setCategories([...categories, { name: name, code: code, mac: mac, imei: imei, site: site, gateway: gateway }]);
        } else {
            const updatedCategories = [...categories];
            updatedCategories[editingIndex].name = name;
            updatedCategories[editingIndex].code = code;
            updatedCategories[editingIndex].mac = mac;
            updatedCategories[editingIndex].imei = imei;
            updatedCategories[editingIndex].site = site;
            updatedCategories[editingIndex].gateway = gateway;
            setCategories(updatedCategories);
            setEditingIndex(-1);
        }
        setName("");
        setCode("");
        setMac("");
        setImei("");
        setSite("");
        setGatewayType("");
    };

    const handleEdit = (index) => {
        setName(categories[index].name);
        setCode(categories[index].code);
        setMac(categories[index].mac);
        setImei(categories[index].imei);
        setSite(categories[index].site);
        setGatewayType(categories[index].gateway);
        setEditingIndex(index)
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
                        <div className="card-header">Add Gateway</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
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
                                    <div className="col-md-6">
                                        <label className="font-weight-bold" htmlFor="city">
                                            Site
                                        </label>
                                        <input
                                            className="form-control mt-3"
                                            type="text"
                                            id="name"
                                            value={editingIndex === -1 ? site : null}
                                            onChange={(e) => setSite(e.target.value)}
                                            placeholder="Site"
                                            required=""
                                        />
                                    </div>
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
                                    <th scope="col">MAC</th>
                                    <th scope="col">IMEI</th>
                                    <th scope="col">Site</th>
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
                                                    value={site}
                                                    onChange={(e) => setSite(e.target.value)}
                                                />
                                            ) : (
                                                category.site
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
