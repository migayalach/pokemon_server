import { prisma } from "@/utils/prisma";

const pokemonType = async (types) => {
  const typePromise = types.map(async (index) => {
    const responseDataType = await prisma.type.findMany({
      where: {
        idType: +index,
      },
      select: {
        name: true,
      },
    });
    return responseDataType;
  });
  return (await Promise.all(typePromise)).flat().map(({ name }) => name);
};

const pokemonReturnData = async (data) =>
  await Promise.all(
    data.map(
      async ({
        idPokemon,
        name,
        height,
        weight,
        life,
        attack,
        defense,
        speed,
        create,
        types,
      }) => {
        return {
          idPokemon,
          name,
          height,
          weight,
          life,
          attack,
          defense,
          speed,
          create,
          types: await pokemonType(types.map((index) => index)),
        };
      }
    )
  );

export { pokemonType, pokemonReturnData };
