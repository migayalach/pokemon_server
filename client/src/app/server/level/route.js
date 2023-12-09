// METODO MOSTRAR TODO Y CREAR
import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

// COSAS A CONSIDERAR
// - MANEJADOR DE ERRORES
// - REPETIDOS
// - RESPUESTAS VACIAS

export const GET = async (request) => {
  const searchParams = new URLSearchParams(request.url.split("?")[1]);
  const dataUrl = searchParams.get("name");
  if (!dataUrl) {
    const levelList = await prisma.level.findMany();
    return NextResponse.json({
      message: "List level",
      levelList,
    });
  }
  const nameLevel = await prisma.level.findMany({
    where: {
      name: {
        contains: `%${dataUrl}%`,
      },
    },
  });
  if (nameLevel.length) {
    return NextResponse.json({
      levelName: true,
      nameLevel,
    });
  }
  return NextResponse.json({
    levelName: false,
    nameLevel,
  });
};

export const POST = async (request) => {
  const { name } = await request.json();
  const newLevel = await prisma.level.create({
    data: {
      name,
    },
  });
  return NextResponse.json({
    message: "Level creado con exito",
    newLevel,
  });
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
