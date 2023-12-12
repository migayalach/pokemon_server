import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

// eliminar solo los creados
// mostrat por id
export const GET = (request, { params }) => {
  return NextResponse.json({
    message: "GET pokemon",
  });
};

export const DELETE = (request, { params }) => {
  return NextResponse.json({
    message: "DELETE pokemon",
  });
};
