import "./Card.css";
import backgroundImage from "../backgroundImage/weather.jpg";

const Card = (props) => {
  return (
    <div>
      <img className="image" src={backgroundImage} />
      {props.children}
    </div>
  );
};

export default Card;
