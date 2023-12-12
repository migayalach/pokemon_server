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



// export const POST = async (request) => {
//   const { name, height, weight, life, attack, defense, speed, types } =
//       await request.json();
//     const newPoke = await prisma.pokemon.create({
//       data: {
//         name,
//         height,
//         weight,
//         life,
//         attack,
//         defense,
//         speed,
//       },
//     });
  
//     const typesPromise = types.map((typeId) => {
//       return prisma.pokemonType.create({
//         data: {
//           idPokemon: newPoke.idPokemon,
//           idType: typeId,
//         },
//       });
//     });
  
//     await Promise.all(typesPromise);
  
//     return NextResponse.json({
//       create: false,
//       message: `La base de datos ya tiene pokemon guardados desde la  API`,
//       newPoke,
//     });
//   };
  