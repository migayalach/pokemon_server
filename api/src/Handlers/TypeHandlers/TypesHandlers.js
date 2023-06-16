const database = require("../../Utils/dataBase");

const SUCCESS = 200;
const ERROR = 400;

const typePokemos = (request, response) => {
  try {
    response.status(SUCCESS).json(database);
  } catch (error) {
    response.status(ERROR).send(":C");
  }
};

module.exports = { typePokemos };
