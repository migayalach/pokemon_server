// METODO MOSTRAR TODO Y CREAR
import { NextResponse } from "next/server";
import { validatePutLevel } from "../middleware";
import {
  getControllerLevel,
  postControllerLevel,
  putControllerLevel,
} from "./controllerLevel";
const { responseErrorLevel } = require("@/utils/responseJson");

export const GET = async (request) => {
  const searchParams = new URLSearchParams(request.url.split("?")[1]);
  const dataUrl = searchParams.get("name");
  try {
    const getLevelData = await getControllerLevel(dataUrl);
    return NextResponse.json(getLevelData);
  } catch (error) {
    return NextResponse.json(responseErrorLevel(error.message));
  }
};

export const POST = async (request) => {
  const { name } = await request.json();
  try {
    const dataResponse = await validatePutLevel(name, postControllerLevel);
    return NextResponse.json(dataResponse);
  } catch (error) {
    return NextResponse.json(responseErrorLevel(error.message));
  }
};

export const PUT = async (request) => {
  const { idLevel, name } = await request.json();
  try {
    const updateLevel = await putControllerLevel(+idLevel, name);
    return NextResponse.json(updateLevel);
  } catch (error) {
    return NextResponse.json(responseErrorLevel(error.message));
  }
};
