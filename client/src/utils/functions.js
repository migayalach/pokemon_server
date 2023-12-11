const clearResponseUser = (dataUser) =>
  dataUser.map(({ idUser, idLevel, name, email, level }) => ({
    idUser,
    idLevel,
    name,
    email,
    levelUser: level.name,
  }));

const randomAtrributes = () => Math.floor(Math.random() * (100 - 60 + 1)) + 60;

const clearTypeId = (array) =>
  array.map((index) => index.map(({ idType }) => idType)).flat();

module.exports = {
  clearResponseUser,
  randomAtrributes,
  clearTypeId,
};
