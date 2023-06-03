import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import City from '../../pages/City/City';
import DeviceCategory from '../../pages/DeviceCategory/DeviceCategory';
import DeviceType from "../../pages/DeviceType/DeviceType";
import Gateway from '../../pages/Gateway/Gateway';
// import SitesList from '../../pages/SitesList/Sites';
import Sites from '../../pages/Sites/Sites';
import Device from '../../pages/Device/Device';

const Main = () => {
  return (
    <Tabs
      defaultActiveKey="city"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="city" title="City">
        <City />
      </Tab>
      <Tab eventKey="sites" title="Sites">
        <Sites />
      </Tab>
      <Tab eventKey="device" title="Device">
        <Device />
      </Tab>
      <Tab eventKey="deviceCategory" title="Device Category">
      <DeviceCategory />
      </Tab>
      <Tab eventKey="deviceType" title="Device Type">
      <DeviceType/>
      </Tab>
      <Tab eventKey="gateway" title="Gateway">
        <Gateway/>
      </Tab>
    </Tabs>
  );
}

export default Main;