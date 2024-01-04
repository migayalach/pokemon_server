import { NextResponse } from "next/server";
import { getPokemon, createPokemon, editPokemon } from "./controllerPokemon";
import {
  responseSuccessPokemon,
  responseErrorPokemon,
} from "@/utils/responseJson";

export const GET = async (request) => {
  const searchParams = new URLSearchParams(request.url.split("?")[1]);
  try {
    const pokemonData = await getPokemon(searchParams);
    return NextResponse.json(responseSuccessPokemon(`Pokemon`, pokemonData));
  } catch (error) {
    return NextResponse.json(responseErrorPokemon(error.message));
  }
};

export const POST = async (request) => {
  const { name, height, weight, life, attack, defense, speed, types } =
    await request.json();
  try {
    const pokemonPost = await createPokemon(
      name,
      +height,
      +weight,
      +life,
      +attack,
      +defense,
      +speed,
      types
    );
    return NextResponse.json(
      responseSuccessPokemon(`Pokemon creado con exito`, pokemonPost)
    );
  } catch (error) {
    return NextResponse.json(responseErrorPokemon(error.message));
  }
};

export const PUT = async (request) => {
  const {
    idPokemon,
    name,
    height,
    weight,
    life,
    attack,
    defense,
    speed,
    types,
  } = await request.json();
  try {
    const pokemonUpdate = await editPokemon(
      +idPokemon,
      name,
      +height,
      +weight,
      +life,
      +attack,
      +defense,
      +speed,
      types
    );
    return NextResponse.json(
      responseSuccessPokemon(`Pokemon modificado con exito`, pokemonUpdate)
    );
  } catch (error) {
    return NextResponse.json(responseErrorPokemon(error.message));
  }
};
