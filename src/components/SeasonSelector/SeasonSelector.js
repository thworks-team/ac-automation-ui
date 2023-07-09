import React from 'react'

const SeasonSelector = ({setSelectCopySeason,setSelectCopyDay,handleCopy}) => {
  return (
    <div className="row">
      <div className="col-sm-3 my-3">
        <select className="form-select" aria-label="Default select example" onChange={ev => setSelectCopySeason(ev.target.value)}>
          <option selected>Select Season</option>
          <option value="1">Season1</option>
          <option value="2">Season2</option>
          <option value="3">Season3</option>
          <option value="4">Season4</option>
          <option value="5">Season5</option>
          <option value="6">Season6</option>
          <option value="7">Season7</option>
          <option value="8">Season8</option>
          <option value="9">Season9</option>
          <option value="10">Season10</option>
        </select>
      </div>
      <div className="col-sm-3 my-3">
        <select className="form-select" aria-label="Default select example" onChange={ev => setSelectCopyDay(ev.target.value)}>
          <option selected>Select Day</option>
          <option value="Sunday">Sunday</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
        </select>
      </div>
      <div className="col-sm-3 my-3">
        <button type="button" className="btn btn-primary" onClick={handleCopy}>Copy</button>
      </div>
      {/* <div className="col-sm-3 my-3">
        <button type="button" className="btn btn-success" onClick={handleSubmit}>Submit</button>
      </div> */}
    </div>
  )
}

export default SeasonSelector