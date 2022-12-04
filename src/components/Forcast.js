import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Forcast.css";

const Forcast = () => {
  // Once set, returns an object that contains data needed for 5 day forcast.
  const [coords, setCoords] = useState([]);
  const navigate = useNavigate();
  let location = useLocation();
  const lat = location.state.lat;
  const lon = location.state.lon;
  const weatherList = coords.list;

  // Fetches data
  const fiveForcast = async () => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=${5}&appid=${"5a4b2d457ecbef9eb2a71e480b947604"}&units=imperial`
    );
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    fiveForcast().then((res) => setCoords(res));
  }, [location.state]);

  if (!weatherList) return;

  let now = new Date();
  weatherList.map((el, i) => {
    const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    nextDay.setDate(now.getDate() + i);
    return (el.date = nextDay);
  });

  const handleDate = (date) => {
    const format = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", format);
  };
  // Navigates back to home page
  const navigateZipcodes = () => {
    navigate("/");
  };
  return (
    <>
      <h3 className="forcast-header">{`5-day forcast for ${location.state.name}`}</h3>
      <ul className="forcast-ul">
        {weatherList.map((el) => (
          <li className="forcast-li">
            {handleDate(el.date)}: {el.weather[0].main} - Min:{" "}
            {Math.round(el.temp.min)} - Max: {Math.round(el.temp.max)}
            {
              <img
                className="forcast-img"
                src={`/images/${el.weather[0].main}.png`}
              />
            }
          </li>
        ))}
      </ul>
      <button className="navigate" onClick={navigateZipcodes}>
        Back to main page
      </button>
    </>
  );
};
export default Forcast;
