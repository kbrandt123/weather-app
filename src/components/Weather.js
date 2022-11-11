import { useNavigate } from "react-router-dom";
import "./Weather.css";

// Component is used render the list data and pass over needed data for a five day forcast via useNavigate.
const Weather = (props) => {
  const navigate = useNavigate();
  const navigateForcast = (e, el) => {
    navigate(`/forcast/${el.zip}`, {
      state: {
        name: el.name,
        lat: el.lat,
        lon: el.lon,
      },
    });
  };

  return (
    <>
      <ul className="weather-ul">
        {props.list.map((el, index) => (
          <li className="weather-li" key={el.id}>
            <div className="allweather-info">
              <h2>
                {el.name} {`(${el.zip})`}
              </h2>
              <h3>Current Conditions: {el.conditions}</h3>
              <h3>Temperatures Today:</h3>
            </div>

            <p>{`Current ${el.currentTemp} - Max ${el.maxTemp} - Min ${el.minTemp}`}</p>

            <a
              onClick={(e) => navigateForcast(e, el)}
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
            <button
              className="delete"
              onClick={(e) => props.handleRemove(e, el.id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Weather;
