const { Router } = require("express");
const typesRouter = Router();
const { typePokemos } = require("../Handlers/TypeHandlers/TypesHandlers")

typesRouter.get("/", typePokemos);

module.exports = typesRouter;
