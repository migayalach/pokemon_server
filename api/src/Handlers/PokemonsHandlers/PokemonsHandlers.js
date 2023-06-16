const SUCCESS = 200;
const ERROR = 400;
const dataBase = require("../../Utils/dataBase");
const {
  getAllPokemons,
  buscarPokemon,
} = require("../../Controllers/Pokemon/getAllPokemons");
const createPokemon = require("../../Controllers/Pokemon/createPokemon");
const { getUserById } = require("../../Controllers/Pokemon/getUserById");

// AGREGAR POKEMON
const pokemonPost = async (request, response) => {
  const { nombre, imagen, vida, ataque, defensa, velocidad, altura, peso } =
    request.body;
  try {
    const newPokemon = await createPokemon(
      nombre,
      imagen,
      vida,
      ataque,
      defensa,
      velocidad,
      altura,
      peso
    );
    response.status(SUCCESS).json(newPokemon);
  } catch (error) {
    response.status(ERROR).json({ error: error.message });
  }
};

const getPokemons = async (request, response) => {
  const { nombre } = request.query;
  try {
    const results = nombre
      ? await buscarPokemon(nombre)
      : await getAllPokemons();
    response.status(SUCCESS).json(results);
  } catch (error) {
    response.status(ERROR).send({ error: error.message });
  }
};

const getPokemonId = async (request, response) => {
  const { idPokemon } = request.params;
  const source = isNaN(idPokemon) ? "bdd" : "api";
  try {
    const consulta = await getUserById(idPokemon, source);
    response.status(SUCCESS).json(consulta);
  } catch (error) {
    response.status(ERROR).json({ error: error.message });
  }
};

const deletePokemon = (request, response) => {
  try {
    const { idPokemon } = request.params;
    const deletePokemon = dataBase.filter(
      (element) => element.id !== +idPokemon
    );
    return response.status(SUCCESS).json(deletePokemon);
    // return response.status(ERROR).json({ message: "Faltan datos" });
  } catch (error) {
    response.status(ERROR).send(":C");
  }
};

const pokemonEdit = (request, response) => {
  try {
    const { id, name, tipo } = request.body;
    console.log({ id, name, tipo });
  } catch (error) {}
};

module.exports = {
  getPokemons,
  getPokemonId,
  pokemonPost,
  deletePokemon,
  pokemonEdit,
};
