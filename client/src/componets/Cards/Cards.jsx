import Card from "../Card/Card";
import Paginate from "../Paginate/Paginate";

import "./cards.css";

const Cards = ({ dataCards }) => {
  return (
    <div className="grid">
      {dataCards.map(({ name, url }, index) => (
        <Card key={index} name={name} url={url} />
      ))}
      <Paginate />
    </div>
  );
};

export default Cards;
