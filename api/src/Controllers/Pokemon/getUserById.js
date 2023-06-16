const axios = require("axios");
const { Pokemon } = require("../../db");
const URL = "https://pokeapi.co/api/v2/pokemon";

const getUserById = async (id, source) => {
  const response =
    source === "api"
      ? (await axios.get(`${URL}/${id}`)).data
      : await Pokemon.findByPk(id, {
          attibutes: ["id", "name"],
        });
  return response;
};

module.exports = { getUserById };
