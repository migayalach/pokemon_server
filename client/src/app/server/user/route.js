import { NextResponse } from "next/server";

export const GET = () => {
  return NextResponse.json({
    message: "GET USER",
  });
};

export const POST = () => {
  return NextResponse.json({
    message: "POST USER",
  });
};

export const PUT = () => {
  return NextResponse.json({
    message: "PUT USER",
  });
};

export const DELETE = () => {
  return NextResponse.json({
    message: "DELETE USER",
  });
};
