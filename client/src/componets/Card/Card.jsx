"use client";
import Link from "next/link";
import { useState } from "react";

const handleSaludo = (userId) => {
  alert(`${userId}`);
};

const handleFavorite = (idCharacter, type) => {
  alert(`${idCharacter} - ${type}`);
};

const Card = ({ name, url }) => {
  const [favorite, setFavorite] = useState([]);
  const [, , , , , , idCharacter] = url.split("/");

  return (
    <div>
      <button onClick={() => handleFavorite(idCharacter, "favorite")}>
        ❤️
      </button>
      <button onClick={() => handleFavorite(idCharacter, "notFavorite")}>
        🤍
      </button>
      <button onClick={() => handleSaludo(idCharacter)}>X</button>
      <Link href={`/home/${idCharacter}`}>{url}</Link>
      <p>{name}</p>
      <hr />
    </div>
  );
};
export default Card;
