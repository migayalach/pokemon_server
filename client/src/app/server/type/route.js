import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
const URL_TYPES = `https://pokeapi.co/api/v2/type`;

export const GET = async () => {
  const response = await fetch(URL_TYPES);
  const type = (await response.json()).results.map(({ name }) => name);
  return NextResponse.json({
    types: true,
    message: "Se obtuvo una lista con todos los tipos de pokemon",
    type,
  });
};

export const POST = async (request) => {
  const { type } = await request.json();
  const countType = await prisma.type.count();
  if (!countType) {
    const createType = type.map((index) =>
      prisma.type.create({ data: { name: index } })
    );
    const response = await Promise.all(createType);
    return NextResponse.json({
      create: true,
      message: "Se agregaron con exito los typos de pokemon",
      response,
    });
  }
  return NextResponse.json({
    create: false,
    message: `La base de datos ya tiene datos guardados`,
  });
};
