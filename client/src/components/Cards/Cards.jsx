"use client";

import Card from "../Card/Card";
import Paginate from "../Paginate/Paginate";

// HOOK'S
import { useState } from "react";

import "./cards.css";

const Cards = ({ dataCards }) => {
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataCards.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="grid">
      {currentItems.map(
        (
          {
            idPokemon,
            name,
            height,
            weight,
            life,
            attack,
            defense,
            speed,
            create,
            types,
          },
          index
        ) => (
          <Card
            key={index}
            idPokemon={idPokemon}
            name={name}
            height={height}
            weight={weight}
            life={life}
            attack={attack}
            defense={defense}
            speed={speed}
            create={create}
            types={types}
          />
        )
      )}
      <Paginate
        itemsPerPage={itemsPerPage}
        totalItems={dataCards.length}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Cards;
