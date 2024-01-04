// METODOS ELIMINAR, EDITAR Y BUSCAR POR ID
import { NextResponse } from "next/server";
import { getControllerLevelId, deleteLevel } from "../controllerLevel";
const { responseErrorLevel } = require("@/utils/responseJson");

export const GET = async (request, { params }) => {
  const idLevelParams = +params.idLevel;
  try {
    const dataGetLevel = await getControllerLevelId(idLevelParams);
    return NextResponse.json(dataGetLevel);
  } catch (error) {
    return NextResponse.json(responseErrorLevel(error.message));
  }
};

export const DELETE = async (request, { params }) => {
  const idLevelParams = +params.idLevel;
  try {
    const levelDelete = await deleteLevel(idLevelParams);
    return NextResponse.json(levelDelete);
  } catch (error) {
    return NextResponse.json(responseErrorLevel(error.message));
  }
};
