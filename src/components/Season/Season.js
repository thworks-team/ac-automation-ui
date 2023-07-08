import React , {forwardRef, useEffect, useState} from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { VscCalendar } from 'react-icons/vsc';

import SeasonSelector from '../SeasonSelector/SeasonSelector';
import TimePicker from '../TimePicker/TimePicker';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './index.css';
import { postRequest } from '../../utils/apiHelper';

const Season = ({season,selectedSchedule,seasonNum,seasonLevelData,setSeasonLevelData,setLoading,seasonData,updateScheduleList}) => {
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState({});
  const [selectedEndTime, setSelectedEndTime] = useState({});
  const [selectedTemp, setSelectedTemp] = useState({});
  const [selectedStatus, setSelectedStatus] = useState({});
  const [selectedOptionCheck, setSelectedOptionCheck] = useState({});
  const [localScheduleTimings, setLocalScheduleTimings] = useState({
    "Sunday": [1],
    "Monday": [1],
    "Tuesday": [1],
    "Wednesday": [1],
    "Thursday": [1],
    "Friday": [1],
    "Saturday": [1]
  });

  const [day, setDay] = useState('Sunday');
  const [dayLevelData, setDayLevelData] = useState({});

  useEffect(() => {
    if(seasonData?.fromDate){
      if(seasonData.fromDate){
        let date = new Date(seasonData.fromDate);
        setSelectedFromDate(date)
      }
    }

    if(seasonData?.toDate){
      if(seasonData.toDate){
        let date = new Date(seasonData.toDate);
        setSelectedToDate(date);
      }
    }
  }, [seasonData])

  useEffect(() => {
    if(seasonData?.scheduleTiming){
      let dayData = {};
      seasonData?.scheduleTiming.forEach((item,index) => {
        if(item.scheduleTiming && item.scheduleTiming !== []){
          let localData = {};
          item.scheduleTiming.forEach((val,index) => {
            localData[index] = val;
          })
          if(localData && localData !== {}){
            dayData[item.day] = {...item,'scheduleTiming':localData};
          }
        } 
      })
      setDayLevelData(dayData);
    }
  },[seasonData])

  const handleSelectedTime = (time,value,index) => {
    if(time === "startTime"){
      setSelectedStartTime({...selectedStartTime,[day]:{...selectedStartTime[day],[index]:value}});
      let scheduleTiming =  (dayLevelData[day] && dayLevelData[day]['scheduleTiming']) ? {...dayLevelData[day]['scheduleTiming']} : [];
      // let scheduleTiming =  (dayLevelData[day] && dayLevelData[day]['scheduleTiming']) ? dayLevelData[day]['scheduleTiming'] : [];

      scheduleTiming[index] = {
        ...scheduleTiming[index],
        'startTime':value
      };

      // scheduleTiming.splice(index, 0, {
      //   ...scheduleTiming[index],
      //   'startTime':value
      // });

      let data = {
        ...dayLevelData,
        [day]:{
          ...dayLevelData[day],
          'scheduleTiming' : scheduleTiming
        }
      }
      setDayLevelData(data)
    }else{
      setSelectedEndTime({...selectedEndTime,[day]:{...selectedEndTime[day],[index]:value}});
      let scheduleTiming =  (dayLevelData[day] && dayLevelData[day]['scheduleTiming']) ? {...dayLevelData[day]['scheduleTiming']} : [];

      scheduleTiming[index] = {
        ...scheduleTiming[index],
        'endTime':value
      };

      // scheduleTiming.splice(index, 0, {
      //   ...scheduleTiming[index],
      //   'endTime':value
      // });

      let data = {
        ...dayLevelData,
        [day]:{
          ...dayLevelData[day],
          'scheduleTiming' : scheduleTiming
        }
      }
      setDayLevelData(data)
    }
  }

  const handleSelectedTemp = (val,index) => {
    setSelectedTemp({...selectedTemp,[day]:{...selectedTemp[day],[index]:val}});
    let scheduleTiming =  (dayLevelData[day] && dayLevelData[day]['scheduleTiming']) ? {...dayLevelData[day]['scheduleTiming']} : [];

    scheduleTiming[index] = {
      ...scheduleTiming[index],
      'temperature':Number(val)
    };

    let data = {
      ...dayLevelData,
      [day]:{
        ...dayLevelData[day],
        'scheduleTiming' : scheduleTiming
      }
    }
    setDayLevelData(data)
  }

  const handleSelectedStatus = (val,index) => {
    setSelectedStatus({...selectedStatus,[day]:{...selectedStatus[day],[index]:val}});

    let scheduleTiming =  (dayLevelData[day] && dayLevelData[day]['scheduleTiming']) ? {...dayLevelData[day]['scheduleTiming']} : [];

    scheduleTiming[index] = {
      ...scheduleTiming[index],
      'status':val ? 'on' : 'off'
    };

    let data = {
      ...dayLevelData,
      [day]:{
        ...dayLevelData[day],
        'scheduleTiming' : scheduleTiming
      }
    }
    setDayLevelData(data)
  }

  const handleSelectedOptionCheck = (val,index) => {
    setSelectedOptionCheck({...selectedOptionCheck,[day]:{...selectedOptionCheck[day],[index]:val}});
    let scheduleTiming =  (dayLevelData[day] && dayLevelData[day]['scheduleTiming']) ? {...dayLevelData[day]['scheduleTiming']} : [];

    scheduleTiming[index] = {
      ...scheduleTiming[index],
      'enable':val === 'ON' ? true : false
    };

    let data = {
      ...dayLevelData,
      [day]:{
        ...dayLevelData[day],
        'scheduleTiming' : scheduleTiming
      }
    }
    setDayLevelData(data)
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

  const handleDataFormat = value => {
    if(value){
      let date = value.getDate();
      let month = value.getMonth();
      let year = value.getFullYear();

      return `${date}-${month}-${year}`
    }
  }

  const handleDaySubmit = async() => {
    let scheduleTiming = [];
    if(dayLevelData){
      Object.keys(dayLevelData).forEach(item => {
        let dayScheduleTiming = [];
        if(dayLevelData[item]?.scheduleTiming){
          Object.keys(dayLevelData[item].scheduleTiming).forEach(key => {
            let obj = dayLevelData[item].scheduleTiming[key];
            dayScheduleTiming.push(obj);
            // if(obj.enable){
            // }
          })
        }
        if(seasonData && seasonData['_id']){
          scheduleTiming.push({...dayLevelData[item],scheduleTiming:dayScheduleTiming})
        }else{
          scheduleTiming.push({day:item,scheduleTiming:dayScheduleTiming})
        }
      })
    }
    let data = {};
    let response = {};
    if(seasonData && seasonData['_id']){
      data = {
        ...seasonData,
        "scheduleTiming": scheduleTiming,
        "fromDate": handleDataFormat(new Date(seasonData.fromDate)),
        "toDate": handleDataFormat(new Date(seasonData.toDate))
      }
      setLoading(true);
      response = await postRequest(`/schedule?id=${seasonData['_id']}`, data);
      updateScheduleList('update',response.data.data);
      setLoading(false);
    }else{
      data = {
        "name": selectedSchedule.name,
        "season": seasonNum,
        "fromDate": handleDataFormat(selectedFromDate),
        "toDate": handleDataFormat(selectedToDate),
        "day": day,   
        "scheduleTiming": scheduleTiming
      } 
      setLoading(true);
      response = await postRequest(`/schedule`, data);
      updateScheduleList('create',response.data.data);
      setLoading(false);
    }
    setLoading(true);
    setLoading(false);
    // setSeasonLevelData({[season]: {
    //   ...seasonLevelData[season],
    //   [day]: response.data.data
    // }})
    alert('Schedule Data saved successfully !!');
  }

  const handleAddLocalRow = () => {
    let arr = [...localScheduleTimings[day]]
    arr.push(localScheduleTimings[day].length + 1);
    setLocalScheduleTimings({
      ...localScheduleTimings,
      [day]: arr
    })
  }

  return (
    <div>
      <div className="row">
        <div className="m-4 col-sm-4">
          <label for="basic-url" className="form-label">From Date</label>
          <div className="input-group" >
            <div>
              <DatePicker 
                selected={selectedFromDate}  
                onChange={(date) => {
                  setSelectedFromDate(date);
                  // setDayLevelData({...dayLevelData,[day]:{...dayLevelData[day],'fromDate':date}});
                }} 
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
                onChange={(date) => {
                  setSelectedToDate(date)
                  // setDayLevelData({...dayLevelData,[day]:{...dayLevelData[day],'toDate':date}});
                }} 
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
          onSelect={val => setDay(val)}
          activeKey={day}
        >
          {["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map((item,index) => {
            let dayData = seasonData?.scheduleTiming?.find(val => {
              return val?.day?.toLowerCase() === item.toLowerCase()
            });
            const localScheduleTimingsDayLevel = localScheduleTimings[item];
            let scheduleTimingsArray = dayData?.scheduleTiming ? [...dayData.scheduleTiming,...localScheduleTimingsDayLevel] : localScheduleTimingsDayLevel;
            return <Tab eventKey={item} title={item}>
              <SeasonSelector handleSubmit={handleDaySubmit}/> 
              <div>
                {scheduleTimingsArray.map((timePicker,index) => {
                  return <TimePicker 
                            day={day}
                            index={index} 
                            handleSelectedTime={handleSelectedTime} 
                            handleSelectedTemp={handleSelectedTemp} 
                            handleSelectedStatus={handleSelectedStatus} 
                            selectedTemp={selectedTemp}
                            selectedEndTime={selectedEndTime}
                            selectedStartTime={selectedStartTime}
                            selectedFromDate={selectedFromDate}
                            selectedToDate={selectedToDate}
                            timePickerData={timePicker}
                            dayLevelData={scheduleTimingsArray}
                            handleSelectedOptionCheck={handleSelectedOptionCheck}
                            setLocalScheduleTimings={setLocalScheduleTimings}
                            localScheduleTimings={localScheduleTimings}
                            addLocalRow={handleAddLocalRow}
                        />
                })}
              </div>
            </Tab>
          })}
        </Tabs>
        <div className="my-3 submitButtonContainer">
          <button type="button" className="btn btn-primary" onClick={handleDaySubmit}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Season