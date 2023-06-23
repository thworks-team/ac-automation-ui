import React, {useEffect, useState} from 'react'


const TimePicker = ({day,dayLevelData,handleSelectedTime,handleSelectedTemp,handleSelectedStatus,index,handleSelectedOptionCheck}) => {

  useEffect(() => {
    setSelectedTemp(null)
  }, [day])
  

  const [selectedTemp, setSelectedTemp] = useState(null);

  const handleStartTime = () => {
    let startTime = document.getElementById('startTime').value;
    handleSelectedTime('startTime',startTime,index)
  }

  const handleEndTime = () => {
    let endTime = document.getElementById('endTime').value;
    handleSelectedTime('endTime',endTime,index)
  }

  const handleRangeSelector = ev => {
    handleSelectedTemp(ev.target.value,index);
    setSelectedTemp(ev.target.value)
  }

  const handleOnOff = ev => {
    handleSelectedStatus(ev.target.checked,index)
  }

  const handleOptionCheck = val => {
    let value = val ? 'ON' : 'OFF';
    handleSelectedOptionCheck(value,index)
  }

  return (
    <div>
      {/* {console.log((dayLevelData && dayLevelData[day] && dayLevelData[day]['scheduleTiming'][index]) ? dayLevelData[day]['scheduleTiming'][index].startTime : null)} */}
      <div className="row m-1 d-flex justify-content-between">
        <div className="form-check m-2 col-sm-1 w-5">
          <input className="form-check-input position-relative top-50 start-50" type="checkbox" value="" id="flexCheckDefault" onChange={(e) => handleOptionCheck(e.target.checked)} />
        </div>
        <div className="m-2 col-sm-2">
          <label for="basic-url" className="form-label">Start Time</label>
          <div className="input-group">
            <input type="time" className="form-control" id="startTime" value={(dayLevelData && dayLevelData[day] && dayLevelData[day]['scheduleTiming'][index]) ? dayLevelData[day]['scheduleTiming'][index].startTime : null} aria-describedby="basic-addon3 basic-addon4"  onChange={handleStartTime} />
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
          <input className="form-check-input position-relative top-50 start-10" type="checkbox" onChange={(ev) => handleOnOff(ev)}role="switch" id="flexSwitchCheckDefault" />
          <label className="form-check-label position-relative top-50 start-10" for="flexSwitchCheckDefault">ON/OFF</label>
        </div>
        <div className="m-2 col-sm-4">
          <label for="customRange2" className="form-label">Temperature</label>
          <div className='d-flex'>
            <input type="range" className="form-range" min="18" max="50" id="customRange2" onChange={(ev) => handleRangeSelector(ev)}></input>
            <span style={{marginLeft:'1rem',fontWeight:'bolder'}}>{selectedTemp}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimePicker