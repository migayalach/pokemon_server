import { NextResponse } from "next/server";
import { loginUser } from "./controllerLogin";
const { responseSuccessLogin } = require("@/utils/responseJson");

export const POST = async (request) => {
  const { email, password } = await request.json();
  try {
    const { message, dataUser } = await loginUser(email, password);
    return NextResponse.json(responseSuccessLogin(message, dataUser));
  } catch (error) {
    return NextResponse.json({
      access: false,
      message: error.message,
    });
  }
};
