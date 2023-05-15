import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddCategory from "./pages/AddCategory";
import AddDevice from "./pages/AddDevice";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddDevice />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);