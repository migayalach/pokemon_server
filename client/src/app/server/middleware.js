export const validatePutLevel = async (data, next) => {
  if (!data) {
    throw Error(`Por favor introduzca un nombre`);
  }
  return await next(data);
};
