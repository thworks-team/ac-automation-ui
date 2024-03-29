import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";

import City from './pages/City/City';
import DeviceCategory from './pages/DeviceCategory/DeviceCategory';
import DeviceType from "./pages/DeviceType/DeviceType";
import Gateway from './pages/Gateway/Gateway';
// import SitesList from './pages/SitesList/Sites';
import Sites from './pages/Sites/Sites';
import Device from './pages/Device/Device';
import Schedules from './pages/Schedules/Schedules';
import Login from './pages/Login/Login';


export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Device />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/schedules" element={<Schedules />}/>
        <Route path="/city" element={<City />}/>
        <Route path="/device-category" element={<DeviceCategory />}/>
        <Route path="/device-type" element={<DeviceType />}/>
        <Route path="/gateway" element={<Gateway />}/>
        <Route path="/sites" element={<Sites />}/>
        <Route path="/device" element={<Device />}/>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);