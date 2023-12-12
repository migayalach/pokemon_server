import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

// llega el id del usuario y muestra todos sus fav
export const GET = (request, { params }) => {
  const favoriteUser = prisma.favorite.findMany({
    where: {
      idUser: +params.idUser,
    },
  });
  return NextResponse.json({
    message: "GET FAVORITE",
  });
};

export const POST = () => {
  return NextResponse.json({
    message: "POST FAVORITE",
  });
};

export const DELETE = () => {
  return NextResponse.json({
    message: "DELETE FAVORITE",
  });
};
