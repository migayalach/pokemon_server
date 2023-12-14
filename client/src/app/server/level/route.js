// METODO MOSTRAR TODO Y CREAR
import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { validatePutLevel } from "../middleware";

const getControllerLevel = async (dataUrl) => {
  if (!dataUrl) {
    const levelResponse = await prisma.level.findMany();
    return { level: true, responseLebel: levelResponse };
  }

  const nameLevel = await prisma.level.findMany({
    where: {
      name: {
        contains: `%${dataUrl}%`,
      },
    },
  });

  if (nameLevel.length) {
    return { level: true, responseLebel: nameLevel };
  }

  throw Error(`No se pudo encontrar ningun nivel`);
};

const putControllerLevel = async (name) => {
  const levelExist = await prisma.level.findMany({
    where: {
      name,
    },
  });

  if (levelExist.length) {
    return { message: "Ya existe un nivel con este nombre", newLevel: [] };
  }

  const newLevel = await prisma.level.create({
    data: {
      name,
    },
  });

  return { message: "Level creado con éxito", newLevel };
};

export const GET = async (request) => {
  const searchParams = new URLSearchParams(request.url.split("?")[1]);
  const dataUrl = searchParams.get("name");
  try {
    const { level, responseLebel } = await getControllerLevel(dataUrl);
    return NextResponse.json({
      message: "List level",
      level,
      responseLebel,
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      level: false,
      responseLebel: [],
    });
  }
};

export const POST = async (request) => {
  const { name } = await request.json();
  try {
    const dataResponse = await validatePutLevel(name, putControllerLevel);
    return NextResponse.json({
      dataResponse,
    });
  } catch (error) {
    return NextResponse.json({
      dataResponse: {
        message: error.message,
      },
    });
  }
};

export const PUT = async (request) => {
  const { idLevel, name } = await request.json();
  const levelUpdate = await prisma.level.update({
    where: {
      idLevel: +idLevel,
    },
    data: {
      name,
    },
  });
  return NextResponse.json({
    message: "Update success",
    updateLevel: true,
    levelUpdate,
  });
};
