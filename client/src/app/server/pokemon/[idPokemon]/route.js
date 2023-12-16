import { NextResponse } from "next/server";
import { getIdPokemon, deletePokemon } from "../controllerPokemon";
import {
  responseSuccessPokemon,
  responseErrorPokemon,
} from "@/utils/responseJson";

//devolver pokemon type nombre
export const GET = async (request, { params }) => {
  const idPokemon = +params.idPokemon;
  try {
    const pokemonId = await getIdPokemon(idPokemon);
    return NextResponse.json(
      responseSuccessPokemon(`Pokemon encontrado`, pokemonId)
    );
  } catch (error) {
    return NextResponse.json(responseErrorPokemon(error.message));
  }
};

export const DELETE = async (request, { params }) => {
  const idPokemon = +params.idPokemon;
  try {
    const pokemonDelete = await deletePokemon(idPokemon);
    return NextResponse.json(
      responseSuccessPokemon(`Pokemon eliminado`, pokemonDelete)
    );
  } catch (error) {
    return NextResponse.json(responseErrorPokemon(error.message));
  }
};
