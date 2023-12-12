import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
const { selectDataPokemon, responseGetPokemon } = require("@/utils/functions");
//editar solo los creados
//delete solo los creados

export const GET = async (request) => {
  const searchParams = new URLSearchParams(request.url.split("?")[1]);
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
    return NextResponse.json(
      responseGetPokemon(true, "Get name pokemon", searchName)
    );
  } else if (searchParams.get("create")) {
    const createBoolean = searchParams.get("create") === "true";
    const pokemonCreate = await prisma.pokemon.findMany({
      where: {
        create: createBoolean,
      },
      select: selectDataPokemon(),
    });
    return NextResponse.json(
      responseGetPokemon(true, "Get create pokemon", pokemonCreate)
    );
  } else {
    const pokemonAll = await prisma.pokemon.findMany({
      select: selectDataPokemon(),
    });
    return NextResponse.json(
      responseGetPokemon(true, "Get all pokemon's", pokemonAll)
    );
  }
};

export const POST = async (request) => {
  const { name, height, weight, life, attack, defense, speed, types } =
    await request.json();
  const countPokemon = await prisma.pokemon.count();
  if (!countPokemon) {
    return NextResponse.json({
      pokemon: false,
      message: `Lo siento si aun no hay datos de pokemon guardados desde la api no se puede agregar nuevos pokemon´s pongase en contacto con el administrador`,
    });
  }
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
