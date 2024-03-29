import React, { useEffect, useState } from 'react'
import { TimePicker } from "react-ios-time-picker";
import './index.css'

const TimePickerComponent = (
  {
    day,
    dayLevelData,
    timePickerData,
    handleSelectedTime,
    handleSelectedTemp,
    handleSelectedStatus,
    index,
    handleSelectedOptionCheck,
    setLocalScheduleTimings,
    localScheduleTimings,
    addLocalRow
  }) => {

  const [selectedTemp, setSelectedTemp] = useState(timePickerData?.temperature ? timePickerData.temperature : 0);
  const [selectedStatus, setSelectedStatus] = useState(true);
  const [selectedEnable, setSelectedEnable] = useState(true);

  useEffect(() => {
    if (timePickerData?.status) {
      if (timePickerData.status === 'off') {
        setSelectedStatus(false);
      }
    } 
    if (timePickerData?.enable === false) {
      setSelectedEnable(false)
    }
  }, [timePickerData])


  const handleStartTime = (startTime) => {
    handleSelectedTime('startTime', startTime, index)
  }

  const handleEndTime = (endTime) => {
    handleSelectedTime('endTime', endTime, index)
  }

  const handleRangeSelector = ev => {
    handleSelectedTemp(ev.target.value, index);
    setSelectedTemp(ev.target.value)
  }

  const handleOnOff = ev => {
    setSelectedStatus(ev.target.checked);
    handleSelectedStatus(ev.target.checked, index)
  }

  const handleOptionCheck = ev => {
    console.log('ccc', ev.target.checked);
    setSelectedEnable(ev.target.checked);
    handleSelectedOptionCheck(ev.target.checked, index);
  }

  const { startTime, endTime } = timePickerData;


  return (
    <div className='d-flex'>
      <div className="row m-1 col-12 d-flex justify-content-between">
        <div className="form-check col-sm-1">
          <input 
            className="form-check-input position-relative top-50 start-50" 
            type="checkbox" 
            id="scheduleEnable" 
            value={selectedEnable} 
            checked={selectedEnable} 
            onChange={(ev) => handleOptionCheck(ev)} 
          />
        </div>
        <div className="col-sm-2">
          <label for="basic-url" className="form-label">Start Time</label>
          <div className="input-group">
            <TimePicker
              value={startTime ? startTime : "00:00"}
              theme="Bourbon"
              className="timepicker"
              placeholder="Start Time"
              onSave={handleStartTime}
            />
            {/* <span className="input-group-text" id="basic-addon3"><AiOutlineClockCircle /></span> */}
          </div>
        </div>
        <div className="col-sm-2">
          <label for="basic-url" className="form-label">End Time</label>
          <div className="input-group">
            {/* <input type="time" className="form-control" id="endTime" aria-describedby="basic-addon3 basic-addon4"  onChange={handleEndTime} /> */}
            <TimePicker
              value={endTime ? endTime : "00:00"}
              // theme="Bourbon"
              className="timepicker"
              placeholder="End Time"
              onSave={handleEndTime}
            />
            {/* <span className="input-group-text" id="basic-addon3"><AiOutlineClockCircle /></span> */}
          </div>
        </div>
        <div className="form-check form-switch col-sm-1">
          <input 
            className="form-check-input position-relative top-50 start-10" 
            value={selectedStatus} 
            checked={selectedStatus} 
            type="checkbox" 
            onChange={(ev) => { handleOnOff(ev) }} 
            role="switch" 
            id="statusSwitch" 
          />
          <label className="form-check-label position-relative top-50 start-10" for="statusSwitch">ON/OFF</label>
        </div>
        <div className="col-sm-4">
          <label for="customRange2" className="form-label">Temperature</label>
          <div className='d-flex'>
            <input type="range" className="form-range" min="-50" step={0.1} max="50" value={selectedTemp} id="customRange2" onChange={(ev) => handleRangeSelector(ev)}></input>
            <span style={{ marginLeft: '1rem', fontWeight: 'bolder' }}>{selectedTemp}</span>
          </div>
        </div>
      </div>
      {(index === dayLevelData.length - 1) && <div className="col-sm-1" style={{ alignSelf: 'center' }}>
        <button className='btn btn-success' onClick={addLocalRow}>Add</button>
      </div>}
    </div>
  )
}

export default TimePickerComponent