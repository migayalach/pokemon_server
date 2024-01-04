import { NextResponse } from "next/server";
import { getFavorite } from "../controllerFavorite";
const {
  responseSuccessFavorite,
  responseErrorFavorite,
} = require("@/utils/responseJson");

export const GET = async (request, { params }) => {
  const idUser = +params.idFavorite;
  try {
    const { user, pokemon } = await getFavorite(+idUser);
    return NextResponse.json(
      responseSuccessFavorite(`Lista de favoritos`, user, pokemon)
    );
  } catch (error) {
    return NextResponse.json(responseErrorFavorite(error.message));
  }
};
