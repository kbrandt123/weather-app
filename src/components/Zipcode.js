import { useState, useRef, useEffect } from "react";
import "./Zipcode.css";
import Weather from "./Weather";
import uuid from "react-uuid";

const Zipcode = () => {
  // We are using list to initally loop over all weather items in an array. These items get set on line 42
  // If there is already localstorage, we set the list to the local storage data.
  const [list, setList] = useState(() => {
    const saved = localStorage.getItem("weather");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  const zipInputRef = useRef(null);

  // Receives the the weather data from promise and creates a new object with needed data.
  const saveData = (location) => {
    const conditions = location.weather[0].main;
    const weatherData = {
      name: location.name,
      conditions: conditions,
      zip: zipInputRef.current.value,
      lat: location.coord.lat,
      lon: location.coord.lon,
      currentTemp: Math.round(location.main.temp),
      minTemp: Math.round(location.main.temp_min),
      maxTemp: Math.round(location.main.temp_max),
      id: uuid(),
    };

    // Here we are calling the function below which creates an array of all current and previous weather data
    getCurrentData(weatherData);
    zipInputRef.current.value = "";
  };

  // Takes all previous data and current and stores in array. Also sets localStorage.
  const getCurrentData = (data) => {
    if (!data) return;
    setList((prevData) => {
      const newArr = [data, ...prevData];
      localStorage.setItem("weather", JSON.stringify(newArr));
      return newArr;
    });
  };

  // Promise that fetches and upon success, returns an object with weather data
  const getZipcode = async () => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zipInputRef.current.value},us&units=imperial&APPID=5a4b2d457ecbef9eb2a71e480b947604`
    );
    const data = await res.json();

    return data;
  };

  // Function that will run when the user submits a valid zipcode
  const handleSubmission = (e) => {
    e.preventDefault();
    getZipcode().then((res) => {
      if (res.cod === "400" || res.cod === "404")
        return alert("Please enter a valid zipcode");
      saveData(res);
    });
  };

  // Function that enables deletion of a list item. Also deletes the current data in localStorage and creates a newList
  const handleRemove = (e, id) => {
    e.stopPropagation();
    const newList = list.filter((item) => item.id !== id);
    localStorage.removeItem("weather");
    localStorage.setItem("weather", JSON.stringify(newList));
    setList(newList);
  };

  return (
    <>
      <form className="zipcode" onSubmit={handleSubmission}>
        <h1>Enter Zipcode</h1>
        <input type="text" placeholder="Zipcode" ref={zipInputRef} />
        <button type="submit">Add location</button>
      </form>
      {<Weather list={list} handleRemove={handleRemove} />}
    </>
  );
};

export default Zipcode;
