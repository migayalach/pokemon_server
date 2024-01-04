import { prisma } from "@/utils/prisma";
const { responseSuccessLevel } = require("@/utils/responseJson");

const existIdLevel = async (idLevel) =>
  await prisma.level.findUnique({
    where: {
      idLevel,
    },
  });

const getControllerLevelId = async (idLevel) => {
  if (!(await existIdLevel(idLevel))) {
    throw Error`El nivel que usted busca no existe`;
  }
  const levelSearch = await prisma.level.findUnique({
    where: {
      idLevel,
    },
  });

  return responseSuccessLevel(`Se encontro lo que busca`, levelSearch);
};

const getControllerLevel = async (dataUrl) => {
  if (!dataUrl) {
    const levelResponse = await prisma.level.findMany();
    return responseSuccessLevel(`Listado de niveles`, levelResponse);
  }

  const nameLevel = await prisma.level.findMany({
    where: {
      name: {
        contains: `%${dataUrl}%`,
      },
    },
  });

  if (nameLevel.length) {
    return responseSuccessLevel(`Busqueda encontrada por nombre`, nameLevel);
  }

  throw Error(`No se pudo encontrar ningun nivel`);
};

const postControllerLevel = async (name) => {
  const levelExist = await prisma.level.findMany({
    where: {
      name,
    },
  });

  if (levelExist.length) {
    throw Error("Ya existe un nivel con este nombre");
  }

  const newLevel = await prisma.level.create({
    data: {
      name,
    },
  });

  return responseSuccessLevel("Level creado con éxito", newLevel);
};

const putControllerLevel = async (idLevel, name) => {
  if (!(await existIdLevel(idLevel))) {
    throw Error`El nivel que usted desea actualizar no existe`;
  }

  const existName = await prisma.level.findMany({
    where: {
      name: {
        contains: `%${name}%`,
      },
    },
  });
  if (existName.length) {
    throw Error`Lo siento no puede haber duplicados con el mismo nombre`;
  }

  const levelUpdate = await prisma.level.update({
    where: {
      idLevel: +idLevel,
    },
    data: {
      name,
    },
  });
  return responseSuccessLevel(`Update success`, levelUpdate);
};

const deleteLevel = async (idLevel) => {
  if (!(await existIdLevel(idLevel))) {
    throw Error`El nivel que usted desea eliminar no existe`;
  }
  const deleteLevel = await prisma.level.delete({
    where: {
      idLevel,
    },
    select: { name: true },
  });
  return responseSuccessLevel("Level delete success", deleteLevel);
};

export {
  getControllerLevelId,
  getControllerLevel,
  postControllerLevel,
  putControllerLevel,
  deleteLevel,
};
