const { Pokemon } = require("../../db");
const createPokemon = async (nombre, imagen, vida, ataque, defensa, velocidad, altura, peso) => {
  const newPokemon = await Pokemon.create({nombre, imagen, vida, ataque, defensa, velocidad, altura, peso});
  return newPokemon;
}

module.exports = createPokemon;