import Zipcode from "./components/Zipcode";
import React from "react";
import Card from "./components/Card";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Forcast from "./components/Forcast";

const App = () => {
  return (
    <Card>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Zipcode />}></Route>
          <Route path="/forcast/:zipcode" element={<Forcast></Forcast>} />
        </Routes>
      </BrowserRouter>
    </Card>
  );
};

export default App;
