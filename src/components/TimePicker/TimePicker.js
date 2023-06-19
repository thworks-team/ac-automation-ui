import React, {useState} from 'react'


const TimePicker = ({handleSelectedTime}) => {

  const handleStartTime = () => {
    let startTime = document.getElementById('startTime').value;
    handleSelectedTime('startTime',startTime)
  }

  const handleEndTime = () => {
    let endTime = document.getElementById('endTime').value;
    handleSelectedTime('endTime',endTime)
  }

  const handleRangeSelector = event => {
    
  }

  return (
    <div>
      <div className="row m-1">
        <div className="form-check m-2 col-sm-1 w-5">
          <input className="form-check-input position-relative top-50 start-50" type="checkbox" value="" id="flexCheckDefault" />
        </div>
        <div className="m-2 col-sm-2">
          <label for="basic-url" className="form-label">Start Time</label>
          <div className="input-group">
            <input type="time" className="form-control" id="startTime" aria-describedby="basic-addon3 basic-addon4"  onChange={handleStartTime} />
            {/* <span className="input-group-text" id="basic-addon3"><AiOutlineClockCircle /></span> */}
          </div>
        </div>
        <div className="m-2 col-sm-2">
          <label for="basic-url" className="form-label">End Time</label>
          <div className="input-group">
            <input type="time" className="form-control" id="endTime" aria-describedby="basic-addon3 basic-addon4"  onChange={handleEndTime} />
            {/* <span className="input-group-text" id="basic-addon3"><AiOutlineClockCircle /></span> */}
          </div>
        </div>
        <div className="form-check form-switch m-2 col-sm-1">
          <input className="form-check-input position-relative top-50 start-10" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
          <label className="form-check-label position-relative top-50 start-10" for="flexSwitchCheckDefault">ON/OFF</label>
        </div>
        <div className="m-2 col-sm-3">
          <label for="customRange2" className="form-label">Temperature</label>
          <input type="range" className="form-range" min="18" max="26" id="customRange2" onChange={(ev) => handleRangeSelector(ev)}></input>
        </div>
      </div>
    </div>
  )
}

export default TimePicker