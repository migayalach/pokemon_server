// FUNCIONES PARA USUARIO
const clearResponseUser = (dataUser) =>
  dataUser.map(({ idUser, idLevel, name, email, level }) => ({
    idUser,
    idLevel,
    name,
    email,
    levelUser: level.name,
  }));

const randomAtrributes = () => Math.floor(Math.random() * (100 - 60 + 1)) + 60;

const clearTypeId = (array) =>
  array.map((index) => index.map(({ idType }) => idType)).flat();

// FUNCIONES PARA POKEMON
const clearResponsePokemon = (arr) =>
  arr.map(
    ({
      idPokemon,
      name,
      height,
      weight,
      life,
      attack,
      defense,
      create,
      speed,
      types,
    }) => ({
      idPokemon,
      name,
      height,
      weight,
      life,
      attack,
      defense,
      speed,
      create,
      types: types.map(({ idType }) => idType),
    })
  );

const selectDataPokemon = () => ({
  idPokemon: true,
  name: true,
  height: true,
  weight: true,
  life: true,
  attack: true,
  defense: true,
  speed: true,
  create: true,
  types: {
    select: {
      idType: true,
    },
  },
});

const responseGetPokemon = (response, message, responseData) => ({
  searchPokemon: response,
  message,
  dataResponse: clearResponsePokemon(responseData),
});

const arrayResponse = (array) => {
  if (Array.isArray(array)) {
    return array;
  }
  return [array];
};

module.exports = {
  clearResponseUser,
  randomAtrributes,
  clearTypeId,
  selectDataPokemon,
  responseGetPokemon,
  clearResponsePokemon,
  arrayResponse
};
