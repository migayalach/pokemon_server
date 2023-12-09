import { NextResponse } from "next/server";

export const GET = () => {
  return NextResponse.json({
    message: "GET LEVEL",
  });
};

export const POST = async (request) => {
  const { name, number } = await request.json();
  console.log(name, number);
  return NextResponse.json({
    message: "POST LEVEL",
  });
};

export const PUT = () => {
  return NextResponse.json({
    message: "PUT LEVEL",
  });
};

export const DELETE = () => {
  return NextResponse.json({
    message: "DELETE LEVEL",
  });
};
