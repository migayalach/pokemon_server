import { prisma } from "@/utils/prisma";
import { clearResponseUser } from "@/utils/functions";

export const loginUser = async (email, password) => {
  const existEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!existEmail) {
    throw Error(`El email: ${email}, no se encuentra registrado`);
  }

  const existPassword = await prisma.user.findUnique({
    where: {
      email,
      password,
    },
  });

  if (!existPassword) {
    throw Error(`La contraseña: ${password}, no es correcta`);
  }

  const dataUser = await prisma.user.findUnique({
    where: {
      email,
      password,
    },
    select: {
      idUser: true,
      idLevel: true,
      name: true,
      email: true,
      level: true,
    },
  });
  const [dataUserResponse] = clearResponseUser([dataUser]);

  return {
    message: `Bienvenido ${dataUserResponse.name}`,
    dataUser: dataUserResponse,
  };
};
