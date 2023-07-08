import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Season from "../../components/Season/Season";
import './Schedules.css';
import { getRequest } from "../../utils/apiHelper";

const Schedules = () => {

  const [displaySeason,setDisplaySeason] = useState(false);
  const [season,setSeason] = useState('Season1');
  const [scheduleList,setScheduleList] = useState([]);
  const [scheduleName,setScheduleName] = useState('');
  const [selectedSchedule,setSelectedSchedule] = useState('');
  const [seasonLevelData,setSeasonLevelData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await getRequest('/schedule');
        setLoading(false);
        setScheduleList(response.data.data);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }
    fetchData();

  }, [])

  const updateScheduleList = (operation,data) => {
    if(operation === 'update'){
      let dupScheduleList = {...scheduleList};
      let index = scheduleList.findIndex(item => item['_id'] === data['_id']);
      dupScheduleList[index] = data;
      setScheduleList(dupScheduleList);
    }else{
      setScheduleList([...scheduleList,data]);
    }
  }

  return (
    <div className="main">
      {
        loading ?
        <div className="loaderContainer">
          <div class="loader"></div>
        </div>
        :
        error ? <div className="warningMessage">Something went wrong.. Please try again !!</div> :
        <div className="row">
          <div className="col-sm-12">
            <div className="card m-5">
              <div className="card-header">Add Schedule Form</div>
              <div className="m-5 col-sm-5">
                <label for="basic-url" className="form-label">Name</label>
                <div className="input-group">
                  <select class="form-select" id="schedule" aria-label="Default select example" onChange={(e) => setSelectedSchedule(JSON.parse(e.target.value))}>
                      <option selected style={{ backgroundColor: 'lightgrey' }} value={null} > -- Select Schedule -- </option>
                      {scheduleList?.map(item => {
                        return <option value={JSON.stringify(item)}>{item.name}</option>
                      })}
                    </select>
                  <input type="text" className="form-control" onChange={ev => {
                    setScheduleName(ev.target.value);
                    if(selectedSchedule) {
                      setSelectedSchedule(null);
                      document.getElementById('schedule').value = '-- Select Schedule --';
                    }
                  }} placeholder="Create Schedule" />
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
                    let seasonData = selectedSchedule?.seasons?.find(val => Number(val.season) === item);
                    // console.log('seasonData',seasonData)
                    return <Tab eventKey={`Season${item}`} title={`Season${item}`}>
                      <Season 
                        season={season} 
                        seasonNum={item} 
                        seasonData={seasonData}
                        seasonLevelData={seasonLevelData} 
                        setSeasonLevelData={setSeasonLevelData} 
                        setLoading={setLoading}
                        selectedSchedule = {selectedSchedule ? selectedSchedule : {name:scheduleName,value:null}}
                        updateScheduleList={updateScheduleList}
                      />
                    </Tab>
                  })}
                </Tabs>
              </div> : null}
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Schedules;
