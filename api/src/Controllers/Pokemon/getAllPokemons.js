const axios = require("axios");
const { Pokemon } = require("../../db");
const URL = "https://pokeapi.co/api/v2/pokemon";

// const clearArray = (array) => {
//   const aux = array.map(({name, url}) => console.log(name, url));
// };

// MOSTRAR TODOS LOS REGISTROS
const getAllPokemons = async () => {
  const dataBasePokemon = await Pokemon.findAll();
  const apiPokemon = (await axios.get(`${URL}`)).data.results;
  // const apiPokemonEnd = clearArray(apiPokemon);
  return [...dataBasePokemon, ...apiPokemon];
};

// BUSCAR POR NOMBRE EN LA API Y BDD
const buscarPokemon = async (nombre) => {
  const dataBasePokemon = await Pokemon.findAll({
    where: {
      nombre,
    },
  });
  const apiPokemonRaw = (await axios.get(`${URL}`)).data.results;
  const filterPokemon = apiPokemonRaw.filter(
    (pokemon) => pokemon.name == nombre
  );
  return [...dataBasePokemon, ...filterPokemon];
};

module.exports = { getAllPokemons, buscarPokemon };
