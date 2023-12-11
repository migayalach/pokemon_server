import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    message: "GET pokemon",
  });
};

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
