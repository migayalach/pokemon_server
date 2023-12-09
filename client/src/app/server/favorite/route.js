import { NextResponse } from "next/server";

export const GET = () => {
  return NextResponse.json({
    message: "GET FAVORITE",
  });
};

export const POST = () => {
  return NextResponse.json({
    message: "POST FAVORITE",
  });
};

export const PUT = () => {
  return NextResponse.json({
    message: "PUT FAVORITE",
  });
};

export const DELETE = () => {
  return NextResponse.json({
    message: "DELETE FAVORITE",
  });
};
