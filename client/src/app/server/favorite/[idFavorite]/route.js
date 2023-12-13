import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
const {
  selectDataPokemon,
  clearResponsePokemon,
} = require("@/utils/functions");

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
  const obj = {
    idUser: favoriteUser[0].idUser,
    idFavorite: favoriteUser[0].idFavorite,
    pokemon: clearResponsePokemon(pokemonResponse),
  };
  return NextResponse.json(
    {
      searchFavorite: true,
      message: `Lista de favoritos`,
      favoriteDataUser: obj,
    },
    { status: 200 }
  );
};
