import React , {forwardRef, useState} from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { VscCalendar } from 'react-icons/vsc';

import SeasonSelector from '../SeasonSelector/SeasonSelector';
import TimePicker from '../TimePicker/TimePicker';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './index.css';

const Season = () => {
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);

  const handleSelectedTime = (time,value) => {
    console.log(time);
    if(time === "startTime"){
      setSelectedStartTime(value);
    }else{
      setSelectedEndTime(value)
    }

  }

  const CustomInputForFromDate = forwardRef(({ value, onClick }, ref) => (
    <div className="example-custom-input" style={{display:'flex',width:'max-content'}} onClick={onClick} ref={ref}>
      <input type="text" className="form-control" id="basic-url" value={value} style={{borderRadius:'5px 0px 0px 5px',minWidth: '20rem',padding: '8px 20px'}} aria-describedby="basic-addon3 basic-addon4" placeholder="Select From Date" />
      <span className="input-group-text" style={{borderRadius:'0px 5px 5px 0px'}} id="basic-addon3"><VscCalendar /></span>
    </div>
  ));

  const CustomInputForToDate = forwardRef(({ value, onClick }, ref) => (
    <div className="example-custom-input" style={{display:'flex',width:'max-content'}} onClick={onClick} ref={ref}>
      <input type="text" className="form-control" id="basic-url" value={value} style={{borderRadius:'5px 0px 0px 5px',minWidth: '20rem',padding: '8px 20px'}} aria-describedby="basic-addon3 basic-addon4" placeholder="Select To Date" />
      <span className="input-group-text" style={{borderRadius:'0px 5px 5px 0px'}} id="basic-addon3"><VscCalendar /></span>
    </div>
  ));

  return (
    <div>
      <div className="row">
        <div className="m-4 col-sm-4">
          <label for="basic-url" className="form-label">From Date</label>
          <div className="input-group" >
            <div>
              <DatePicker 
                selected={selectedFromDate}  
                onChange={(date) => setSelectedFromDate(date)} 
                customInput={<CustomInputForFromDate />} 
              />
            </div>
          </div>
        </div>
        <div className="m-4 col-sm-4">
          <label for="basic-url" className="form-label">To Date</label>
          <div className="input-group">
            <div>
              <DatePicker 
                selected={selectedToDate}  
                onChange={(date) => setSelectedToDate(date)} 
                customInput={<CustomInputForToDate />} 
              />
            </div>
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
        <TimePicker handleSelectedTime={handleSelectedTime} />
        <TimePicker handleSelectedTime={handleSelectedTime} />
        <TimePicker handleSelectedTime={handleSelectedTime} />
      </div>
    </div>
  )
}

export default Season