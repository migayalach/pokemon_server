import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { clearResponseUser } from "@/utils/functions";

export const POST = async (request) => {
  const { email, password } = await request.json();
  const existEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!existEmail) {
    return NextResponse.json({
      login: false,
      message: `El email: ${email}, no se encuentra registrado`,
    });
  }

  const existPassword = await prisma.user.findUnique({
    where: {
      email,
      password,
    },
  });

  if (!existPassword) {
    return NextResponse.json({
      login: false,
      message: `La contraseña: ${password}, no es correcta`,
    });
  }

  const dataUser = await prisma.user.findUnique({
    where: {
      email,
      password,
    },
    select: {
      idUser: true,
      idLevel: true,
      name: true,
      email: true,
      level: true,
    },
  });
  const [dataUserResponse] = clearResponseUser([dataUser]);

  return NextResponse.json({
    message: `Bienvenido ${dataUserResponse.name}`,
    dataUser: dataUserResponse,
  });
};
