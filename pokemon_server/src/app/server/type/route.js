import { NextResponse } from "next/server";
import { getTypeApi, createType } from "./controllerType";
import { responseSuccessType, responseErrorType } from "@/utils/responseJson";
const URL_TYPES = `https://pokeapi.co/api/v2/type`;

export const GET = async () => {
  try {
    const dataTypeApi = await getTypeApi(URL_TYPES);
    return NextResponse.json(
      responseSuccessType(
        `Se obtuvo una lista con todos los tipos de pokemon`,
        dataTypeApi
      )
    );
  } catch (error) {
    return NextResponse.json(responseErrorType(error.message));
  }
};

export const POST = async (request) => {
  const { type } = await request.json();
  try {
    const dataCreate = await createType(type);
    return NextResponse.json(
      responseSuccessType(
        `Se agregaron con exito los typos de pokemon`,
        dataCreate
      )
    );
  } catch (error) {
    return NextResponse.json(responseErrorType(error.message));
  }
};
