import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddCategory from "./pages/DeviceCategory/DeviceCategory";
import AddDevice from "./pages/DeviceType/DeviceType";
import Tabs from "./components/Tab/Tabs";

export default function App() {
  return (
    <BrowserRouter>
    <Tabs/>
      {/* <Routes>
        <Route path="/" element={<AddDevice />}/>
        <Route path="/addcategory" element={<AddCategory />}/>
      </Routes> */}
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);