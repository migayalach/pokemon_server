import Link from "next/link";
import { useState } from "react";

const handleFavorite = (idCharacter, type) => {
  alert(`${idCharacter} - ${type}`);
};

const Card = ({
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
}) => {
  return (
    <div>
      <button onClick={() => handleFavorite(idPokemon, "favorite")}>❤️</button>
      <button onClick={() => handleFavorite(idPokemon, "notFavorite")}>
        🤍
      </button>
      <Link href={`/home/${idPokemon}`}>
        <p>Nombre: {name}</p>
      </Link>
      <p>Altura: {height}</p>
      <p>Peso: {weight}</p>
      <p>Vida: {life}</p>
      <p>Ataque: {attack}</p>
      <p>Defensa: {defense}</p>
      <p>Velocidad: {speed}</p>
      <p>Creado: {create ? "Sí" : "No"}</p>
      <label htmlFor="type">Tipo de pokemon</label>
      <ul>
        {types.map((index) => (
          <li key={index}>{index}</li>
        ))}
      </ul>
      <hr />
    </div>
  );
};
export default Card;
