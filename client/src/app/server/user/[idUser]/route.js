// METODOS ELIMINAR, EDITAR Y BUSCAR POR ID
import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { clearResponseUser } from "@/utils/functions";

export const GET = async (request, { params }) => {
  const dataUser = await prisma.user.findUnique({
    where: {
      idUser: +params.idUser,
    },
    select: {
      idUser: true,
      idLevel: true,
      name: true,
      email: true,
      level: {
        select: {
          name: true,
        },
      },
    },
  });
  if (!dataUser) {
    return NextResponse.json({
      user: false,
      message: `El usuario que intenta buscar no existe`,
      dataUser,
    });
  }
  return NextResponse.json({
    user: true,
    message: "Usuario encontrado",
    dataUser: clearResponseUser([dataUser]),
  });
};

export const DELETE = async (request, { params }) => {
  const existUser = await prisma.user.findUnique({
    where: { idUser: +params.idUser },
  });
  if (!existUser) {
    return NextResponse.json({
      user: false,
      message: `El usuario que intenta eliminar no existe`,
    });
  }
  await prisma.user.delete({
    where: {
      idUser: +params.idUser,
    },
  });

  return NextResponse.json({
    user: true,
    message: `Usuario eliminado con exito`,
  });
};
