import { prisma } from "@/utils/prisma";
import { pokemonType, pokemonReturnData } from "../helpers";
const {
  selectDataPokemon,
  clearResponsePokemon,
} = require("@/utils/functions");

const getPokemon = async (searchParams) => {
  let dataUrl = null;
  if (searchParams.get("name")) {
    dataUrl = searchParams.get("name");
    const searchName = await prisma.pokemon.findMany({
      where: {
        name: {
          contains: `%${dataUrl}%`,
        },
      },
      select: selectDataPokemon(),
    });
    return await pokemonReturnData(clearResponsePokemon(searchName));
  } else if (searchParams.get("create")) {
    const createBoolean = searchParams.get("create") === "true";
    const pokemonCreate = await prisma.pokemon.findMany({
      where: {
        create: createBoolean,
      },
      select: selectDataPokemon(),
    });
    return await pokemonReturnData(clearResponsePokemon(pokemonCreate));
  } else {
    const pokemonAll = await prisma.pokemon.findMany({
      select: selectDataPokemon(),
    });
    return await pokemonReturnData(clearResponsePokemon(pokemonAll));
  }
};

const getIdPokemon = async (idPokemon) => {
  const searchPokemonId = await prisma.pokemon.findUnique({
    where: {
      idPokemon,
    },
    select: selectDataPokemon(),
  });
  if (!searchPokemonId) {
    throw Error("No se pudo encontrar el pokemon que busca");
  }

  return {
    ...searchPokemonId,
    types: await pokemonType(searchPokemonId.types.map(({ idType }) => idType)),
  };
};

const createPokemon = async (
  name,
  height,
  weight,
  life,
  attack,
  defense,
  speed,
  types
) => {
  const countPokemon = await prisma.pokemon.count();
  if (!countPokemon) {
    throw Error(
      `Lo siento si aun no hay datos de pokemon guardados desde la api no se puede agregar nuevos pokemon's pongase en contacto con el administrador`
    );
  }
  const duplicateName = await prisma.pokemon.findFirst({
    where: {
      name,
    },
  });

  if (duplicateName) {
    throw Error(`El Pokemon: ${name} que intentas crear ya existe`);
  }

  const newPokemon = await prisma.pokemon.create({
    data: {
      name,
      height,
      weight,
      life,
      attack,
      defense,
      speed,
      create: true,
    },
  });

  const typesPromise = types.map((typeId) => {
    return prisma.pokemonType.create({
      data: {
        idPokemon: newPokemon.idPokemon,
        idType: typeId,
      },
    });
  });

  await Promise.all(typesPromise);
  return await getIdPokemon(+newPokemon.idPokemon);
};

const editPokemon = async (
  idPokemon,
  name,
  height,
  weight,
  life,
  attack,
  defense,
  speed,
  types
) => {
  const pokemonExist = await prisma.pokemon.findUnique({
    where: {
      idPokemon,
    },
  });

  if (!pokemonExist) {
    throw Error(`El pokemon que intenta editar, no existe`);
  }
  const pokemonCreate = await prisma.pokemon.findMany({
    where: {
      idPokemon,
    },
    select: {
      create: true,
    },
  });
  if (!pokemonCreate[0].create) {
    throw Error(`El pokemon que intenta editar, pertenece a la API`);
  }

  const existTypes = types.map((idType) => {
    return prisma.type.findFirst({
      where: {
        idType,
      },
    });
  });

  const existTypeResponse = await Promise.all(existTypes);
  const auxTypeExist = existTypeResponse.includes(null);
  if (auxTypeExist) {
    throw Error(`El tipo de pokemon al cual intenta cambiar no existe`);
  }

  const editPokemon = await prisma.pokemon.update({
    where: {
      idPokemon,
    },
    data: {
      name,
      height,
      weight,
      life,
      attack,
      defense,
      speed,
    },
  });

  await prisma.pokemonType.deleteMany({
    where: {
      idPokemon,
    },
  });

  const createTypePokemon = types.map((idType) => {
    return prisma.pokemonType.create({
      data: {
        idPokemon,
        idType,
      },
    });
  });

  const resultPromise = (await Promise.all(createTypePokemon)).map(
    ({ idType }) => idType
  );

  return {
    ...editPokemon,
    types: await pokemonType(resultPromise),
  };
};

const deletePokemon = async (idPokemon) => {
  const existPokemon = await prisma.pokemon.findUnique({
    where: {
      idPokemon,
    },
  });
  if (!existPokemon) {
    throw Error("El pokemon que intenta eliminar no se encuentra registrado");
  }
  if (existPokemon.create === false) {
    throw Error("No se puede eliminar el pokemon que selecciono");
  }

  const pokemonDelete = await getIdPokemon(idPokemon);

  await prisma.pokemonType.deleteMany({
    where: {
      idPokemon,
    },
  });

  await prisma.pokemon.delete({
    where: {
      idPokemon,
    },
  });

  return pokemonDelete;
};

export {
  getPokemon,
  getIdPokemon,
  createPokemon,
  editPokemon,
  deletePokemon,
  pokemonType,
  pokemonReturnData,
};
