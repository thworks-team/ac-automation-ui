import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import City from '../../pages/City/City';
import DeviceCategory from '../../pages/DeviceCategory/DeviceCategory';
import DeviceType from "../../pages/DeviceType/DeviceType";
// import AddDevice from '../../pages/AddDevice/AddDevice';
import SitesList from '../../pages/SitesList/Sites';
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
        Tab content for Contact
      </Tab>
    </Tabs>
  );
}

export default Main;