import { NextResponse } from "next/server";
const URL = `https://pokeapi.co/api/v2/pokemon`;

export const GET = async (request, { params }) => {
  const searchParams = new URLSearchParams(request.url.split("?")[1]);
  console.log(searchParams);
  console.log(searchParams.get("name"));
  console.log(searchParams.get("number"));

  const characterData = await fetch(`${URL}/${params.idLevel}`);
  const data = await characterData.json();
  return NextResponse.json(data);
};
