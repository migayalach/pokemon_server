import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dqgcyonb9",
  api_key: "228329725726269",
  api_secret: "txd_1RyaJSSQeQXwfLSw8pDSZ-U",
});

const loadCharacter = async (id) => {
  const character = await fetch(`http://localhost:3000/server/pokemon/${id}`);
  const characterJson = await character.json();
  return characterJson;
};

const Detail = async ({ params }) => {
  const pokemonSearch = (await loadCharacter(params.id)).dataPokemon;
  return (
    <>
      {pokemonSearch.map(
        ({
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
        }) => (
          <div key={idPokemon}>
            <h1>Detail</h1>
            <p>Nombre: {name}</p>
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
          </div>
        )
      )}
    </>
  );
};

export default Detail;
