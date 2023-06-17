const { Router } = require("express");
const typesRouter = Router();
const {
  createTypeHandler,
  getTypeHandler,
} = require("../Handlers/TypeHandlers/typeHandlers");

// typesRouter.get("/", typePokemos);
typesRouter.post("/", createTypeHandler);

typesRouter.get("/", getTypeHandler);

module.exports = typesRouter;
