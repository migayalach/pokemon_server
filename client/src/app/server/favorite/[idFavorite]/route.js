import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
const { selectDataPokemon } = require("@/utils/functions");

export const GET = async (request, { params }) => {
  const favoriteUser = await prisma.favorite.findMany({
    where: {
      idUser: +params.idFavorite,
    },
  });
  if (!favoriteUser.length) {
    return NextResponse.json({
      searchFavorite: false,
      message: `No se pudo encontrar ningun favorito para el usuario buscado`,
      favoriteUser,
    });
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
    idUser: favoriteUser[0].idUser,
    pokemon: pokemonDataClear,
  };

  return NextResponse.json(
    {
      searchFavorite: true,
      message: `Lista de favoritos`,
      favoriteUser: objectResponse,
    },
    { status: 200 }
  );
};

