import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
// import { HiTag } from 'react-icons/hi';

import Season from "../../components/Season/Season";
import './Schedules.css';

const Schedules = () => {

  const [displaySeason,setDisplaySeason] = useState(false);
  const [season,setSeason] = useState('Season1');
  const [seasonName,setSeasonName] = useState('');
  const [seasonLevelData,setSeasonLevelData] = useState({});

  return (
    <div className="main">
      <div className="row">
        <div className="col-sm-12">
          <div className="card m-5">
            <div className="card-header">Add Schedule Form</div>
            <div className="m-5 col-sm-4">
              <label for="basic-url" className="form-label">Name</label>
              <div className="input-group">
                <input type="text" className="form-control" onChange={ev => setSeasonName(ev.target.value)} id="basic-url" aria-describedby="basic-addon3 basic-addon4" placeholder="Name" />
                {/* <span className="input-group-text" id="basic-addon3"><HiTag /></span> */}
                <button className="btn btn-primary" onClick={() => setDisplaySeason(true)}>Proceed</button>
              </div>
            </div>
            {displaySeason ? <div>
              <Tabs
                // defaultActiveKey="city"
                id="justify-tab-example"
                className="mb-3"
                justify
                onSelect={(val) => setSeason(val)}
                activeKey={season}
              >
                {[1,2,3,4,5,6,7,8,9,10].map((item,index) => {
                  return <Tab eventKey={`Season${item}`} title={`Season${item}`}>
                    <Season season={season} seasonName={seasonName} seasonNum={item} seasonLevelData={seasonLevelData} setSeasonLevelData={setSeasonLevelData}/>
                  </Tab>
                })}
              </Tabs>
            </div> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedules;
