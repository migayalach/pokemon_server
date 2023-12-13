import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
const { selectDataPokemon } = require("@/utils/functions");

export const POST = async (request) => {
  const { idUser, idPokemon } = await request.json();
  const existUser = await prisma.user.findUnique({
    where: {
      idUser: +idUser,
    },
  });

  if (!existUser) {
    return NextResponse.json({
      favorite: false,
      message: `El usuario no existe`,
    });
  }

  const existPokemon = await prisma.pokemon.findUnique({
    where: {
      idPokemon: +idPokemon,
    },
    select: selectDataPokemon(),
  });

  if (!existPokemon) {
    return NextResponse.json({
      favorite: false,
      message: `El pokemon no existe`,
    });
  }

  const doublePokemon = await prisma.favorite.findMany({
    where: {
      idPokemon: +idPokemon,
      idUser: +idUser,
    },
  });

  if (doublePokemon.length) {
    return NextResponse.json({
      favorite: true,
      message: `EL usuario no puede tener duplicado a sus pokemons favoritos`,
    });
  }

  await prisma.favorite.create({
    data: {
      idUser: +idUser,
      idPokemon: +idPokemon,
    },
  });

  return NextResponse.json({
    favorite: true,
    message: `Favorito creado con exito`,
    pokemon: {
      ...existPokemon,
      types: existPokemon.types.map(({ idType }) => idType),
    },
  });
};

export const DELETE = async (request, { params }) => {
  const searchParams = new URLSearchParams(request.url.split("?")[1]);
  const idUser = searchParams.get("idUser");
  const idFavorite = searchParams.get("idFavorite");

  const existUser = await prisma.user.findUnique({
    where: {
      idUser: +idUser,
    },
  });

  if (!existUser) {
    return NextResponse.json({
      deleteFavorite: false,
      message: `El usuario no existe`,
    });
  }

  const existFavorite = await prisma.favorite.findUnique({
    where: {
      idUser: +idUser,
      idFavorite: +idFavorite,
    },
  });

  if (!existFavorite) {
    return NextResponse.json({
      deleteFavorite: false,
      message: `No se pudo eliminar el favorito`,
    });
  }

  await prisma.favorite.delete({
    where: {
      idUser: +idUser,
      idFavorite: +idFavorite,
    },
  });

  return NextResponse.json({
    deleteFavorite: true,
    message: "Favorito eliminado",
  });
};
