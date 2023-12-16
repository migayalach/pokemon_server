import { prisma } from "@/utils/prisma";

const getTypeApi = async (URL_TYPES) => {
  const response = await fetch(URL_TYPES);
  return (await response.json()).results.map(({ name }) => name);
};

const createType = async (type) => {
  const countType = await prisma.type.count();
  if (!countType) {
    const createType = type.map((index) =>
      prisma.type.create({ data: { name: index } })
    );
    return await Promise.all(createType);
  }
  throw Error(`La base de datos ya tiene datos guardados`);
};

export { getTypeApi, createType };
