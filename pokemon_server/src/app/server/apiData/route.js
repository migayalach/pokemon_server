import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
const { randomAtrributes, clearTypeId } = require("../../../utils/functions");

const arrayLink = [
  `https://pokeapi.co/api/v2/pokemon?offset=0&limit=44`,
  `https://pokeapi.co/api/v2/pokemon?offset=44&limit=104`,
  `https://pokeapi.co/api/v2/pokemon?offset=148&limit=104`,
  `https://pokeapi.co/api/v2/pokemon?offset=252&limit=104`,
  `https://pokeapi.co/api/v2/pokemon?offset=356&limit=104`,
  `https://pokeapi.co/api/v2/pokemon?offset=460&limit=104`,
  `https://pokeapi.co/api/v2/pokemon?offset=564&limit=104`,
  `https://pokeapi.co/api/v2/pokemon?offset=668&limit=104`,
  `https://pokeapi.co/api/v2/pokemon?offset=772&limit=104`,
  `https://pokeapi.co/api/v2/pokemon?offset=876&limit=104`,
  `https://pokeapi.co/api/v2/pokemon?offset=980&limit=104`,
  `https://pokeapi.co/api/v2/pokemon?offset=1084&limit=104`,
  `https://pokeapi.co/api/v2/pokemon?offset=1188&limit=104`,
];

const typeArray = async (types) => {
  const promesas = types.map(
    async (name) =>
      await prisma.type.findMany({
        where: {
          name,
        },
        select: {
          idType: true,
        },
      })
  );
  return clearTypeId(await Promise.all(promesas));
};

const clearPokemonApi = async ({ name, height, weight, types }) => {
  return {
    name,
    height,
    weight,
    life: randomAtrributes(),
    attack: randomAtrributes(),
    defense: randomAtrributes(),
    speed: randomAtrributes(),
    types: await typeArray(types.map(({ type: { name } }) => name)),
  };
};

const resolvPromise = async (url) => {
  const data = await fetch(`${url}`);
  const responseData = (await data.json()).results.map(({ url }) => url);
  const promises = responseData.map(async (url) => {
    const response = await fetch(url);
    const pokemonData = await response.json();
    return clearPokemonApi(pokemonData);
  });
  return await Promise.all(promises);
};

export const GET = async () => {
  let aux = [];
  for (let link of arrayLink) {
    aux = [...aux, ...(await resolvPromise(link))];
  }
  return NextResponse.json({
    message: "GET pokemon Api",
    pokemon: aux,
  });
};

export const POST = async (request) => {
  const { pokemon } = await request.json();
  const countPokemon = await prisma.pokemon.count();
  if (countPokemon) {
    return NextResponse.json({
      create: false,
      message: `La base de datos ya tiene pokemon guardados desde la API`,
    });
  }
  const promisePokemon = pokemon.map(
    async ({ name, height, weight, life, attack, defense, speed, types }) => {
      const newPokemon = await prisma.pokemon.create({
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

      const typePromises = types.map(async (typeId) => {
        await prisma.pokemonType.create({
          data: {
            idPokemon: newPokemon.idPokemon,
            idType: typeId,
          },
        });
      });
      await Promise.all(typePromises);
    }
  );

  await Promise.all(promisePokemon);

  return NextResponse.json({
    create: true,
    message: `Se agrego a la base de datos pokemon's desde la  API`,
  });
};
