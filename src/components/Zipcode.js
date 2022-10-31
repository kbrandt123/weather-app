import { useState, useRef } from "react";
import "./Zipcode.css";
import Weather from "./Weather";

const Zipcode = (props) => {
  const [location, setLocation] = useState(null);

  const zipInputRef = useRef(null);

  const getZipcode = async () => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zipInputRef.current.value},us&units=imperial&APPID=5a4b2d457ecbef9eb2a71e480b947604`
    );
    const data = await res.json();

    return data;
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    getZipcode().then((res) => {
      if (res.cod === "400" || res.cod === "404")
        return alert("Please enter a valid zipcode");
      setLocation(res);
    });
  };

  if (!location) {
    return (
      <>
        <form className="zipcode" onSubmit={handleSubmission}>
          <h1>Enter Zipcode</h1>
          <input type="text" placeholder="Zipcode" ref={zipInputRef} />
          <button type="submit">Add location</button>
        </form>
      </>
    );
  }

  return (
    <>
      <form className="zipcode" onSubmit={handleSubmission}>
        <h1>Enter Zipcode</h1>
        <input type="text" placeholder="Zipcode" ref={zipInputRef} />
        <button type="submit">Add location</button>
      </form>
      <Weather
        reference={zipInputRef}
        allWeather={props.allWeather}
        addData={props.onAddData}
        location={location}
      />
    </>
  );
};

export default Zipcode;
