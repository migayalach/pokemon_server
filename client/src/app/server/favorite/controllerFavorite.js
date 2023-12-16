import { prisma } from "@/utils/prisma";
const { selectDataPokemon } = require("@/utils/functions");

const createFavorite = async (idUser, idPokemon) => {
  const existUser = await prisma.user.findUnique({
    where: {
      idUser,
    },
  });

  if (!existUser) {
    throw Error(`El usuario no existe`);
  }

  const existPokemon = await prisma.pokemon.findUnique({
    where: {
      idPokemon,
    },
    select: selectDataPokemon(),
  });

  if (!existPokemon) {
    throw Error(`El pokemon no existe`);
  }

  const doublePokemon = await prisma.favorite.findMany({
    where: {
      idPokemon,
      idUser,
    },
  });

  if (doublePokemon.length) {
    throw Error(`EL usuario no puede tener duplicado a sus pokemons favoritos`);
  }

  await prisma.favorite.create({
    data: {
      idUser,
      idPokemon,
    },
  });

  return {
    ...existPokemon,
    types: existPokemon.types.map(({ idType }) => idType),
  };
};

const getFavorite = async (idUser) => {
  const favoriteUser = await prisma.favorite.findMany({
    where: {
      idUser,
    },
  });
  if (!favoriteUser.length) {
    throw Error(`No se pudo encontrar ningun favorito para el usuario buscado`);
  }

  const pokemon = favoriteUser
    .map(({ idPokemon }) => idPokemon)
    .map((idPokemon) =>
      prisma.pokemon.findUnique({
        where: {
          idPokemon,
        },
        select: selectDataPokemon(),
      })
    );
  const pokemonResponse = await Promise.all(pokemon);

  const favoritePokemon = favoriteUser.map(({ idFavorite }) => ({
    idFavorite,
  }));

  const pokemonType = async (types) => {
    const typePromise = types.map(async (idType) => {
      const { name } = await prisma.type.findUnique({
        where: {
          idType,
        },
        select: {
          name: true,
        },
      });
      return name;
    });
    return await Promise.all(typePromise);
  };

  const pokemonDataClear = await Promise.all(
    pokemonResponse.map(
      async (
        {
          idPokemon,
          name,
          height,
          weight,
          life,
          attack,
          defense,
          speed,
          create,
          types,
        },
        index
      ) => {
        return {
          idPokemon,
          idFavorite: favoritePokemon[index]?.idFavorite,
          name,
          height,
          weight,
          life,
          attack,
          defense,
          speed,
          create,
          types: await pokemonType(types.map(({ idType }) => idType)),
        };
      }
    )
  );

  const objectResponse = {
    user: favoriteUser[0].idUser,
    pokemon: pokemonDataClear,
  };

  return objectResponse;
};

const deleteFavorite = async (idUser, idFavorite) => {
  const existUser = await prisma.user.findUnique({
    where: {
      idUser,
    },
  });

  if (!existUser) {
    throw Error(`El usuario no existe`);
  }

  const existFavorite = await prisma.favorite.findUnique({
    where: {
      idUser,
      idFavorite,
    },
  });

  if (!existFavorite) {
    throw Error(`No se pudo eliminar el favorito`);
  }

  await prisma.favorite.delete({
    where: {
      idUser,
      idFavorite,
    },
  });

  return await getFavorite(idUser);
};

export { createFavorite, deleteFavorite, getFavorite };
