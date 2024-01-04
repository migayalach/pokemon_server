import { NextResponse } from "next/server";
import { createUser, getUser, updateUser } from "./controllerUser";
import { responseSuccessUser, responseErrorUser } from "@/utils/responseJson";

export const POST = async (request) => {
  const { name, email, password, idLevel } = await request.json();
  try {
    const postUser = await createUser(name, email, password, idLevel);
    return NextResponse.json(
      responseSuccessUser(`Usuario creado con exito`, postUser)
    );
  } catch (error) {
    return NextResponse.json(responseErrorUser(error.message));
  }
};

export const GET = async (request) => {
  const searchParams = new URLSearchParams(request.url.split("?")[1]);
  const dataUrl = searchParams.get("email");
  try {
    const getDataUser = await getUser(dataUrl);
    return NextResponse.json(responseSuccessUser(`Usuario`, getDataUser));
  } catch (error) {
    return NextResponse.json(responseErrorUser(error.message));
  }
};

export const PUT = async (request) => {
  const { idUser, name, email, password, idLevel } = await request.json();
  try {
    const editUser = await updateUser(+idUser, name, email, password, +idLevel);
    return NextResponse.json(
      responseSuccessUser(`Actualizacion exitosa`, editUser)
    );
  } catch (error) {
    return NextResponse.json(responseErrorUser(error.message));
  }
};
