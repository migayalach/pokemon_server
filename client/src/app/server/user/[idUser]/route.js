// METODOS ELIMINAR, EDITAR Y BUSCAR POR ID
import { NextResponse } from "next/server";
import { getIdUser, deleteUser } from "../controllerUser";
import { responseSuccessUser, responseErrorUser } from "@/utils/responseJson";

export const GET = async (request, { params }) => {
  const idUser = +params.idUser;
  try {
    const userDataId = await getIdUser(idUser);
    return NextResponse.json(
      responseSuccessUser(`Usuario encontrado`, userDataId)
    );
  } catch (error) {
    return NextResponse.json(responseErrorUser(error.message));
  }
};

export const DELETE = async (request, { params }) => {
  const idUser = +params.idUser;
  try {
    const userDelete = await deleteUser(idUser);
    return NextResponse.json(
      responseSuccessUser(`Usuario eliminado con exito`, userDelete)
    );
  } catch (error) {
    return NextResponse.json(responseErrorUser(error.message));
  }
};
