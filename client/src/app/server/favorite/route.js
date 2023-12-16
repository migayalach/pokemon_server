import { NextResponse } from "next/server";
import { createFavorite, deleteFavorite } from "./controllerFavorite";
const {
  responseSuccessFavorite,
  responseErrorFavorite,
} = require("@/utils/responseJson");

export const POST = async (request) => {
  const { idUser, idPokemon } = await request.json();
  try {
    const favoriteCreate = await createFavorite(+idUser, +idPokemon);
    return NextResponse.json(
      responseSuccessFavorite(
        `Pokemon creado con exito`,
        idUser,
        favoriteCreate
      )
    );
  } catch (error) {
    return NextResponse.json(responseErrorFavorite(error.message));
  }
};

export const DELETE = async (request, { params }) => {
  const searchParams = new URLSearchParams(request.url.split("?")[1]);
  const idUser = searchParams.get("idUser");
  const idFavorite = searchParams.get("idFavorite");
  try {
    const { pokemon } = await deleteFavorite(+idUser, +idFavorite);
    return NextResponse.json(
      responseSuccessFavorite(`Pokemon eliminado con exito`, idUser, pokemon)
    );
  } catch (error) {
    return NextResponse.json(responseErrorFavorite(error.message));
  }
};
