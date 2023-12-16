const { arrayResponse } = require("./functions");

// RESPONSE LEVEL
const responseSuccessLevel = (message, dataLevel) => ({
  level: true,
  message,
  dataLevel: arrayResponse(dataLevel),
});

const responseErrorLevel = (message) => ({
  level: false,
  message,
  dataLevel: [],
});

// RESPONSE USER
const responseSuccessUser = (message, dataUser) => ({
  user: true,
  message,
  dataUser: arrayResponse(dataUser),
});

const responseErrorUser = (message) => ({
  user: false,
  message,
  dataUser: [],
});

// RESPONSE TYPE
const responseSuccessType = (message, dataType) => ({
  type: true,
  message,
  dataType: dataType,
});

const responseErrorType = (message) => ({
  type: false,
  message,
  dataUser: [],
});

// RESPONSE POKEMON
const responseSuccessPokemon = (message, dataPokemon) => ({
  pokemon: true,
  message,
  dataPokemon: arrayResponse(dataPokemon),
});

const responseErrorPokemon = (message) => ({
  pokemon: false,
  message,
  dataPokemon: [],
});

// RESPONSE FAVORITE
const responseSuccessFavorite = (message, user, dataFavorite) => ({
  favorite: true,
  message,
  idUser: user,
  dataFavorite: arrayResponse(dataFavorite),
});

const responseErrorFavorite = (message) => ({
  favorite: false,
  message,
  dataFavorite: [],
});

module.exports = {
  responseSuccessLevel,
  responseErrorLevel,
  responseSuccessUser,
  responseErrorUser,
  responseSuccessType,
  responseErrorType,
  responseSuccessPokemon,
  responseErrorPokemon,
  responseSuccessFavorite,
  responseErrorFavorite,
};
