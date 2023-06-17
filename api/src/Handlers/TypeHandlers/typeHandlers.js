const SUCCESS = 200;
const ERROR = 400;
const { createType } = require("../../Controllers/Type/typeControllers");

const createTypeHandler = async (request, response) => {
  const { nombre } = request.body;
  try {
    const newType = await createType(nombre);
    response.status(SUCCESS).json(newType);
  } catch (error) {
    response.status(ERROR).json({ error: error.message });
  }
};

const { Type } = require("../../db");
const URLType = `https://pokeapi.co/api/v2/type`;
const axios = require("axios");

const dataCount = async () => {
  const date = await Type.count();
  if (date === 0) return "Ya se cuentan con typos registrados";
  return await loadingApi();
};

const clearArrayType = (array) =>
  array.map((name) => {
    return { nombre: name.name };
  });

const agregarBdd = async (array) => {
  return await Type.bulkCreate(array);
};

const loadingApi = async () => {
  const apiType = (await axios.get(`${URLType}`)).data.results;
  const apiTypeMap = clearArrayType(apiType);
  console.log(apiTypeMap);
  return await agregarBdd(apiTypeMap);
};

const getTypeHandler = async (request, response) => {
  try {
    const date = await dataCount();
    response.status(SUCCESS).json(date);
  } catch (error) {
    response.status(ERROR).json({ error: error.message });
  }
};

module.exports = { createTypeHandler, getTypeHandler };
