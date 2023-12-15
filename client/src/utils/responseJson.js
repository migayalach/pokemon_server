// RESPONSE LEVEL
const responseSuccessLevel = (message, dataLevel) => ({
  level: true,
  message,
  dataLevel: Array.isArray(dataLevel) ? dataLevel : [dataLevel],
});

const responseErrorLevel = (message) => ({
  level: false,
  message,
  dataLevel: [],
});

module.exports = {
  responseSuccessLevel,
  responseErrorLevel,
};
