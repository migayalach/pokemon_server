const ERROR = 400;
const verificarBody = (request, response, next) => {
  const { nombre, imagen, vida, ataque, defensa, velocidad, altura, peso } =
    request.body;
  if (!nombre) return response.status(ERROR).json({ error: "falta nombre" });
  if (!imagen) return response.status(ERROR).json({ error: "falta imagen" });
  if (!vida) return response.status(ERROR).json({ error: "falta vida" });
  if (!ataque) return response.status(ERROR).json({ error: "falta ataque" });
  if (!defensa) return response.status(ERROR).json({ error: "falta defensa" });
  next();
};

module.exports = { verificarBody };
