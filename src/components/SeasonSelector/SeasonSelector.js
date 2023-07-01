import React from 'react'

const SeasonSelector = ({handleSubmit,handleSelectedStatus,handleSelectedTemp}) => {
  return (
    <div className="row">
      <div className="col-sm-3 my-3">
        <select className="form-select" aria-label="Default select example">
          <option selected>Select Season</option>
          <option value="1">Season1</option>
          <option value="2">Season2</option>
          <option value="3">Season3</option>
          <option value="1">Season4</option>
          <option value="2">Season5</option>
          <option value="3">Season6</option>
          <option value="1">Season7</option>
          <option value="2">Season8</option>
          <option value="3">Season9</option>
          <option value="3">Season10</option>
        </select>
      </div>
      <div className="col-sm-3 my-3">
        <select className="form-select" aria-label="Default select example">
          <option selected>Select Day</option>
          <option value="1">Sunday</option>
          <option value="2">Monday</option>
          <option value="3">Tuesday</option>
          <option value="1">Wednesday</option>
          <option value="2">Thursday</option>
          <option value="3">Friday</option>
          <option value="1">Saturday</option>
        </select>
      </div>
      <div className="col-sm-3 my-3">
        <button type="button" className="btn btn-primary">Copy</button>
      </div>
      {/* <div className="col-sm-3 my-3">
        <button type="button" className="btn btn-success" onClick={handleSubmit}>Submit</button>
      </div> */}
    </div>
  )
}

export default SeasonSelector