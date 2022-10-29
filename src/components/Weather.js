import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import "./Weather.css";

const Weather = (props) => {
  const [list, setList] = useState([]);
  console.log(list);
  const navigate = useNavigate();
  const conditions = props.location.weather.map((el) => el.main);
  const saveData = () => {
    const weatherData = {
      name: props.location.name,
      conditions: conditions[0].toString(),
      zip: props.reference.current.value,
      lat: props.location.coord.lat,
      lon: props.location.coord.lon,
      currentTemp: Math.round(props.location.main.temp),
      minTemp: Math.round(props.location.main.temp_min),
      maxTemp: Math.round(props.location.main.temp_max),
      id: uuid(),
    };

    props.addData(weatherData);
    getCurrentData(weatherData);
  };

  const getCurrentData = (data) => {
    if (!data) return;
    setList((prevData) => {
      return [...prevData, data];
    });
  };

  useEffect(() => {
    saveData();
    props.reference.current.value = "";
  }, [props.location]);

  const navigateForcast = (e, el) => {
    navigate(`/forcast/${el.zip}`, {
      state: {
        name: el.name,
        lat: el.lat,
        lon: el.lon,
      },
    });
  };

  const handleRemove = (e, id) => {
    e.stopPropagation();
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    console.log(id);
  };

  if (list.length === 0) {
    return;
  }

  return (
    <>
      <ul className="weather-ul">
        {list.map((el, index) => (
          <li
            className="weather-li"
            onClick={(e) => navigateForcast(e, el)}
            key={el.id}
          >
            <div className="allweather-info">
              <h2>
                {el.name} {`(${el.zip})`}
              </h2>
              <h3>Current Conditions: {el.conditions}</h3>
              <h3>Temperatures Today:</h3>
            </div>

            <p>{`Current ${el.currentTemp} - Max ${el.maxTemp} - Min ${el.minTemp}`}</p>

            <a
              href={`/forcast/${el.zip}`}
            >{`Show 5-day forcast for ${el.name}`}</a>
            <img
              className="weather-img"
              src={`/images/${
                el.conditions === "Mist" || el.conditions === "Haze"
                  ? "clouds"
                  : el.conditions
              }.png`}
            />
            <button className="delete" onClick={(e) => handleRemove(e, el.id)}>
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Weather;
