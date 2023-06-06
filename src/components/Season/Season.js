import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { VscCalendar } from 'react-icons/vsc';

import SeasonSelector from '../SeasonSelector/SeasonSelector';
import TimePicker from '../TimePicker/TimePicker';

const Season = () => {
  return (
    <div>
      <div className="row">
        <div className="m-4 col-sm-4">
          <label for="basic-url" className="form-label">From Date</label>
          <div className="input-group">
            <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4" placeholder="From Date" />
            <span className="input-group-text" id="basic-addon3"><VscCalendar /></span>
          </div>
        </div>
        <div className="m-4 col-sm-4">
          <label for="basic-url" className="form-label">To Date</label>
          <div className="input-group">
            <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4" placeholder="To Date" />
            <span className="input-group-text" id="basic-addon3"><VscCalendar /></span>
          </div>
        </div>
      </div>
      <div className="col-sm-8 ms-4">
        <Tabs
          defaultActiveKey="Sunday"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="Sunday" title="Sunday">
            <SeasonSelector />
          </Tab>
          <Tab eventKey="Monday" title="Monday">
            <SeasonSelector />
          </Tab>
          <Tab eventKey="Tuesday" title="Tuesday">
            <SeasonSelector />
          </Tab>
          <Tab eventKey="Wednesday" title="Wednesday">
            <SeasonSelector />
          </Tab>
          <Tab eventKey="Thursday" title="Thursday">
            <SeasonSelector />
          </Tab>
          <Tab eventKey="Friday" title="Friday">
            <SeasonSelector />
          </Tab>
          <Tab eventKey="Saturday" title="Saturday">
            <SeasonSelector />
          </Tab>
        </Tabs>
      </div>
      <div>
        <TimePicker />
        <TimePicker />
        <TimePicker />
      </div>
    </div>
  )
}

export default Season