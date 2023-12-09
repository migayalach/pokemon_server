import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dqgcyonb9",
  api_key: "228329725726269",
  api_secret: "txd_1RyaJSSQeQXwfLSw8pDSZ-U",
});

const loadCharacter = async (id) => {
  const character = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const characterJson = await character.json();
  return characterJson;
};

const Detail = async ({ params }) => {
  const { id, name, life, attack, defense, speed, height, weight, types } =
    await loadCharacter(params.id);

  return (
    <>
      <h1>Detail</h1>
      <p>{id}</p>
      <p>Nombre: {name}</p>
      <p>Altura: {height}</p>
      <p>Peso: {weight}</p>
      <p>Tipo</p>
      <ul>
        {types.map(({ type: { name } }, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </>
  );
};

export default Detail;
