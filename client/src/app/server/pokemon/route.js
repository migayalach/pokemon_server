import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
//postear //no puede hacer dos con el mismo nombre
//buscar todo, nombre, los que creaste o los de la api
//editar solo los creados
//delete solo los creados

export const GET = async () => {
  return NextResponse.json({
    message: "GET pokemon",
  });
};

export const POST = async (request) => {
  const { name, height, weight, life, attack, defense, speed, types } =
    await request.json();
  const duplicateName = await prisma.pokemon.findFirst({
    where: {
      name,
    },
  });

  if (duplicateName) {
    return NextResponse.json({
      pokemon: false,
      message: `El Pokemon: ${name} que intentas crear ya existe`,
    });
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

  return NextResponse.json({
    pokemon: true,
    message: "Pokemon creado con exito",
  });
};

export const PUT = () => {
  return NextResponse.json({
    message: "PUT pokemon",
  });
};

export const DELETE = () => {
  return NextResponse.json({
    message: "DELETE pokemon",
  });
};
