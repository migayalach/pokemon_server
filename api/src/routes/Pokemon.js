const { Router } = require("express");
const {
  getPokemons,
  getPokemonId,
  pokemonPost,
  deletePokemon,
  pokemonEdit,
} = require("../Handlers/PokemonsHandlers/PokemonsHandlers");
const pokemonRouter = Router();
const {verificarBody} = require("../Middlewares/validatePokemon");

// AGREGA UN POKEMON A LA BASE DE DATOS
pokemonRouter.post("", verificarBody, pokemonPost);

// OBTIENE TODOS LOS POKEMONS
pokemonRouter.get("/", getPokemons);

// OBTIENE UN POKEMON POR ID RECIVIDO POR PARAMS
pokemonRouter.get("/:idPokemon", getPokemonId);



// ELIMINAR POKEMON
pokemonRouter.delete("/:idPokemon", deletePokemon);

module.exports = pokemonRouter;

pokemonRouter.put("", pokemonEdit);
