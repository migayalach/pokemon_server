import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { clearResponseUser } from "@/utils/functions";

export const POST = async (request) => {
  const { name, email, password, idLevel } = await request.json();
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password,
      idLevel: +idLevel,
    },
  });
  return NextResponse.json({
    create: true,
    newUser,
  });
};

export const GET = async (request) => {
  const searchParams = new URLSearchParams(request.url.split("?")[1]);
  const dataUrl = searchParams.get("email");
  if (!dataUrl) {
    const userData = await prisma.user.findMany({ include: { level: true } });
    return NextResponse.json({
      message: "User list",
      userData: clearResponseUser(userData),
    });
  }
  const dataUser = await prisma.user.findMany({
    where: {
      email: dataUrl,
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

  if (dataUser.length) {
    return NextResponse.json({
      userName: true,
      userData: clearResponseUser(dataUser),
    });
  }
  return NextResponse.json({
    userName: false,
    nameUser,
  });
};

export const PUT = async (request) => {
  const { idUser, name, email, password, idLevel } = await request.json();
  const userExist = await prisma.user.findUnique({
    where: {
      idUser: +idUser,
    },
  });
  if (!userExist) {
    return NextResponse.json({
      user: false,
      message: `El usuario que intentas editar, no existe`,
      userExist,
    });
  }
  const levelExist = await prisma.level.findUnique({
    where: {
      idLevel: +idLevel,
    },
  });
  if (!levelExist) {
    return NextResponse.json({
      user: false,
      message: `El nivel que intentas editar, no existe`,
      levelExist,
    });
  }

  const editUser = await prisma.user.update({
    where: {
      idUser: +idUser,
    },
    data: {
      name,
      email,
      password,
      idLevel: +idLevel,
    },
  });
  return NextResponse.json({
    user: true,
    message: "Usuario editado con exito",
    editUser,
  });
};
