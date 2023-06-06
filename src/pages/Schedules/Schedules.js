import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { HiTag } from 'react-icons/hi';

import Season from "../../components/Season/Season";
import './Schedules.css';

const Schedules = () => {

  return (
    <div className="main">
      <div className="row">
        <div className="col-sm-12">
          <div className="card m-5">
            <div className="card-header">Add Schedule Form</div>
            <div className="m-5 col-sm-4">
              <label for="basic-url" className="form-label">Name</label>
              <div className="input-group">
                <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4" placeholder="Name" />
                <span className="input-group-text" id="basic-addon3"><HiTag /></span>
              </div>
            </div>
            <div>
              <Tabs
                defaultActiveKey="city"
                id="justify-tab-example"
                className="mb-3"
                justify
              >
                <Tab eventKey="Season1" title="Season1">
                  <Season />
                </Tab>
                <Tab eventKey="Season2" title="Season2">
                  <Season />
                </Tab>
                <Tab eventKey="Season3" title="Season3">
                  <Season />
                </Tab>
                <Tab eventKey="Season4" title="Season4">
                  <Season />
                </Tab>
                <Tab eventKey="Season5" title="Season5">
                  <Season />
                </Tab>
                <Tab eventKey="Season6" title="Season6">
                  <Season />
                </Tab>
                <Tab eventKey="Season7" title="Season7">
                  <Season />
                </Tab>
                <Tab eventKey="Season8" title="Season8">
                  <Season />
                </Tab>
                <Tab eventKey="Season9" title="Season9">
                  <Season />
                </Tab>
                <Tab eventKey="Season10" title="Season10">
                  <Season />
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedules;
