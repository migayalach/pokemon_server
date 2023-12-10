const clearResponseUser = (dataUser) =>
  dataUser.map(({ idUser, idLevel, name, email, level }) => ({
    idUser,
    idLevel,
    name,
    email,
    levelUser: level.name,
  }));

module.exports = {
  clearResponseUser,
};
