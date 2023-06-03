import React, { useEffect } from "react";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import "./../../style.css";
import { allData } from "../../constants";

const tableHead = {
    name: "Name",
    city: "City",
    region: "Region",
    pin: "Pincode",
};

const Sites = () => {
    const countPerPage = 10;
    const [value, setValue] = React.useState("");
    const [currentPage, setCurrentPage] = React.useState(1);
    const [collection, setCollection] = React.useState(cloneDeep(allData.slice(0, countPerPage)));

    const searchData = React.useRef(
        throttle(val => {
            const query = val.toLowerCase();
            setCurrentPage(1);
            const data = cloneDeep(
                allData
                    .filter(item => item.name.toLowerCase().indexOf(query) > -1)
                    .slice(0, countPerPage)
            );
            setCollection(data);
        }, 400)
    );

    useEffect(() => {
        if (!value) {
            updatePage(1);
        } else {
            searchData.current(value);
        }
    }, [value]);

    const updatePage = p => {
        setCurrentPage(p);
        const to = countPerPage * p;
        const from = to - countPerPage;
        setCollection(cloneDeep(allData.slice(from, to)));
    };

    const tableRows = rowData => {
        const { key, index } = rowData;
        const tableCell = Object.keys(tableHead);
        const columnData = tableCell.map((keyD, i) => {
            return <td key={i}>{key[keyD]}</td>;
        });
        return <tr key={index}>{columnData}</tr>;
    };

    const tableData = () => {
        return collection.map((key, index) => tableRows({ key, index }));
    };

    const headRow = () => {
        return Object.values(tableHead).map((title, index) => (
            <td key={index}>{title}</td>
        ));
    };

    return (
        <div className="main">
            <div className="row">
                <div className="col-md-4">
                    <div className="card m-5" style={{ width: "18rem" }}>
                        <div className="card-header">City</div>
                        <div className="card-body">
                            <form >
                                {/* <form onSubmit={handleSubmit}> */}
                                <label className="font-weight-bold" htmlFor="city">
                                    Name
                                </label>
                                <input
                                    className="form-control mt-3"
                                    type="text"
                                    id="city"
                                    //   value={city}
                                    //   onChange={(e) => setCity(e.target.value)}
                                    placeholder="Name"
                                    required=""
                                />
                                <label className="font-weight-bold" htmlFor="city">
                                    City
                                </label>
                                <input
                                    className="form-control mt-3"
                                    type="text"
                                    id="city"
                                    //   value={code}
                                    //   onChange={(e) => setCode(e.target.value)}
                                    placeholder="City"
                                    required=""
                                />
                                 <label className="font-weight-bold" htmlFor="city">
                                    Region
                                </label>
                                <input
                                    className="form-control mt-3"
                                    type="text"
                                    id="city"
                                    //   value={city}
                                    //   onChange={(e) => setCity(e.target.value)}
                                    placeholder="Region"
                                    required=""
                                />
                                <label className="font-weight-bold" htmlFor="city">
                                    Pincode
                                </label>
                                <input
                                    className="form-control mt-3"
                                    type="text"
                                    id="city"
                                    //   value={code}
                                    //   onChange={(e) => setCode(e.target.value)}
                                    placeholder="Pincode"
                                    required=""
                                />
                                <div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary m-3 mx-4 px-4"
                                    >
                                        {/* {editingIndex === -1 ? "Add" : "Save"} */}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div class="search">
                        <input
                            placeholder="Search Campaign"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                    </div>
                    <table>
                        <thead>
                            <tr>{headRow()}</tr>
                        </thead>
                        <tbody className="trhover">{tableData()}</tbody>
                    </table>
                    <Pagination
                        pageSize={countPerPage}
                        onChange={updatePage}
                        current={currentPage}
                        total={allData.length}
                    />
                </div>
            </div>
        </div>
    );
};

export default Sites;
