import Zipcode from "./components/Zipcode";
import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Forcast from "./components/Forcast";

const App = () => {
  const [allWeather, setAllWeather] = useState([]);

  const allData = (data) => {
    if (!data) return;
    setAllWeather((prevState) => {
      return [...prevState, data];
    });
  };

  useEffect(() => {
    allData();
  }, []);
  console.log(allWeather);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Zipcode allWeather={allWeather} onAddData={allData} />}
        ></Route>
        <Route path="/forcast/:zipcode" element={<Forcast></Forcast>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
