const axios = require("axios");
const URL = `https://pokeapi.co/api/v2/pokemon/`;

const consulta = async () => {
  try {
    const response = await axios.get(`${URL}`);
    const res = response.data;
    const res2 = res.results;

    // Crear un array de promesas para obtener los detalles de cada Pokémon
    const promises = res2.map(pokemon => axios.get(pokemon.url));

    // Esperar a que todas las promesas se resuelvan
    const responses = await Promise.all(promises);

    // Acceder a los detalles de cada Pokémon en el mismo orden
    for (let i = 0; i < responses.length; i++) {
      const pokemonDetails = responses[i].data;
      console.log(`Detalles de ${res2[i].name}:`, pokemonDetails);
    }
  } catch (error) {
    console.error("Ocurrió un error al hacer la solicitud:", error);
  }
};

consulta();