import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Weather from "./components/Weather";
import DetailsWeather from "./components/DetailsWeather";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Weather />}></Route>
          <Route path="/DetailsWeather" element={<DetailsWeather />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
