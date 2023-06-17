const { Type } = require("../../db");
const createType = async (nombre) => {
  const newType = await Type.create({ nombre });
  return newType;
};

module.exports = {
  createType,
};
