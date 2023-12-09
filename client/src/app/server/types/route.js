import { NextResponse } from "next/server";

export const GET = () => {
  return NextResponse.json({
    message: "GET TYPES",
  });
};

export const POST = () => {
  return NextResponse.json({
    message: "POST TYPES",
  });
};

export const PUT = () => {
  return NextResponse.json({
    message: "PUT TYPES",
  });
};

export const DELETE = () => {
  return NextResponse.json({
    message: "DELETE TYPES",
  });
};
