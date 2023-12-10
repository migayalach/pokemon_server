import { NextResponse } from "next/server";

export const GET = () => {
  return NextResponse.json({
    message: "GET pokemon",
  });
};

// https://pokeapi.co/api/v2/pokemon?offset=1188&limit=104
export const POST = () => {
  return NextResponse.json({
    message: "POST pokemon",
  });
};

export const PUT = () => {
  return NextResponse.json({
    message: "PUT pokemon",
  });
};

export const DELETE = () => {
  return NextResponse.json({
    message: "DELETE pokemon",
  });
};
