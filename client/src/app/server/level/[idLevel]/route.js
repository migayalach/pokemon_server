// METODOS ELIMINAR, EDITAR Y BUSCAR POR ID
import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

// COSAS A CONSIDERAR
// - MANEJADOR DE ERRORES
// - RESPUESTAS VACIAS

export const GET = async (request, { params }) => {
  const levelSearch = await prisma.level.findUnique({
    where: {
      idLevel: +params.idLevel,
    },
  });
  return NextResponse.json({ level: true, levelSearch });
};

export const DELETE = async (request, { params }) => {
  const deleteLevel = await prisma.level.delete({
    where: {
      idLevel: +params.idLevel,
    },
  });
  return NextResponse.json({
    message: "Level delete success",
    levelDelete: true,
    deleteLevel,
  });
};
