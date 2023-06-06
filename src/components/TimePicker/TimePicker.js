import React from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai';

const TimePicker = () => {
  return (
    <div>
      <div className="row m-1">
        <div className="form-check m-2 col-sm-1 w-5">
          <input className="form-check-input position-relative top-50 start-50" type="checkbox" value="" id="flexCheckDefault" />
        </div>
        <div className="m-2 col-sm-2">
          <label for="basic-url" className="form-label">Start Time</label>
          <div className="input-group">
            <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4" placeholder="9:00" />
            <span className="input-group-text" id="basic-addon3"><AiOutlineClockCircle /></span>
          </div>
        </div>
        <div className="m-2 col-sm-2">
          <label for="basic-url" className="form-label">End Time</label>
          <div className="input-group">
            <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4" placeholder="9:00" />
            <span className="input-group-text" id="basic-addon3"><AiOutlineClockCircle /></span>
          </div>
        </div>
        <div className="form-check form-switch m-2 col-sm-1">
          <input className="form-check-input position-relative top-50 start-10" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
          <label className="form-check-label position-relative top-50 start-10" for="flexSwitchCheckDefault">ON/OFF</label>
        </div>
        <div className="m-2 col-sm-3">
          <label for="customRange2" className="form-label">Temperature</label>
          <input type="range" className="form-range" min="0" max="5" id="customRange2"></input>
        </div>
      </div>
    </div>
  )
}

export default TimePicker