import { prisma } from "@/utils/prisma";
import { clearResponseUser } from "@/utils/functions";

const createUser = async (name, email, password, idLevel) => {
  const existEmail = await prisma.user.findMany({
    where: {
      email,
    },
  });
  if (existEmail.length) {
    throw Error(`El email que ingreso ya esta registrado`);
  }

  const existIdLevel = await prisma.level.findUnique({
    where: {
      idLevel: +idLevel,
    },
  });
  if (!existIdLevel) {
    throw Error(`No existe el nivel de acceso que intenta asignar`);
  }

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password,
      idLevel: +idLevel,
    },
  });
  return newUser;
};

const getUser = async (email) => {
  if (!email) {
    const userData = await prisma.user.findMany({ include: { level: true } });
    return clearResponseUser(userData);
  }
  const dataUser = await prisma.user.findMany({
    where: {
      email,
    },
    select: {
      idUser: true,
      idLevel: true,
      name: true,
      email: true,
      level: {
        select: {
          name: true,
        },
      },
    },
  });

  if (dataUser.length) {
    return clearResponseUser(dataUser);
  }
  throw Error(`No hay ningun email registrados`);
};

const getIdUser = async (idUser) => {
  const dataUser = await prisma.user.findUnique({
    where: {
      idUser,
    },
    select: {
      idUser: true,
      idLevel: true,
      name: true,
      email: true,
      level: {
        select: {
          name: true,
        },
      },
    },
  });
  if (!dataUser) {
    throw Error(`El usuario que intenta buscar no existe`);
  }
  return clearResponseUser([dataUser]);
};

const updateUser = async (idUser, name, email, password, idLevel) => {
  const userExist = await prisma.user.findUnique({
    where: {
      idUser,
    },
  });
  if (!userExist) {
    throw Error(`El usuario que intentas editar, no existe`);
  }
  const levelExist = await prisma.level.findUnique({
    where: {
      idLevel,
    },
  });
  if (!levelExist) {
    throw Error(`El nivel que intentas editar, no existe`);
  }

  const editUser = await prisma.user.update({
    where: {
      idUser: +idUser,
    },
    data: {
      name,
      email,
      password,
      idLevel: +idLevel,
    },
  });
  return editUser;
};

const deleteUser = async (idUser) => {
  const existUser = await prisma.user.findUnique({
    where: { idUser },
  });
  if (!existUser) {
    throw Error(`El usuario que intenta eliminar no existe`);
  }
  await prisma.user.delete({
    where: {
      idUser,
    },
  });

  return existUser;
};

export { createUser, getUser, getIdUser, updateUser, deleteUser };
