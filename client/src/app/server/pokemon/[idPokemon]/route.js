import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

// eliminar solo los creados
// mostrat por id
export const GET = (request, { params }) => {
  return NextResponse.json({
    message: "GET pokemon",
  });
};

export const DELETE = async (request, { params }) => {
  const existPokemon = await prisma.pokemon.findUnique({
    where: {
      idPokemon: +params.idPokemon,
    },
  });
  if (!existPokemon) {
    return NextResponse.json({
      pokemonDelete: false,
      message: "El pokemon que intenta eliminar no se encuentra registrado",
    });
  }
  if (existPokemon.create === false) {
    return NextResponse.json({
      pokemonDelete: false,
      message: "No se puede eliminar el pokemon que selecciono",
    });
  }

  await prisma.pokemonType.deleteMany({
    where: {
      idPokemon: +params.idPokemon,
    },
  });

  await prisma.pokemon.delete({
    where: {
      idPokemon: +params.idPokemon,
    },
  });

  return NextResponse.json({
    pokemonDelete: true,
    message: "Pokemon eliminado",
  });
};
