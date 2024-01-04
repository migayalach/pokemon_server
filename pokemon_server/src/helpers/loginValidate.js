import {
  nameRegex,
  emailRegex,
  passwordRegexMay_AZ,
  passwordRegexMin_az,
  passwordRegexDigits,
  passwordRegexSpecialCaracter,
  passwordRegexLength,
  passwordRegex,
} from "./regex";

const validationLogin = (userData) => {
  const errors = {};

  // EMAIL
  if (!emailRegex.test(userData.email)) {
    errors.email = "Ingrese una direccion de correo valida";
  }
  if (!userData.email) {
    errors.email = "Por favor ingrese un correo de contacto";
  }
  if (userData.email.length > 35) {
    errors.email =
      "El nombre de usuario no puede tener mas de 35 caracteres :C";
  }

  // PASSWORD
  if (!userData.password) {
    errors.password = "La contraseña no puede estar vacía";
  } else {
    if (!passwordRegexMay_AZ.test(userData.password)) {
      errors.password = "Debe contener al menos una letra mayúscula (A-Z)";
    }
    if (!passwordRegexMin_az.test(userData.password)) {
      errors.password = "Debe contener al menos una letra minúscula (a-z)";
    }
    if (!passwordRegexDigits.test(userData.password)) {
      errors.password = "Debe contener al menos un dígito (0-9)";
    }
    if (!passwordRegexSpecialCaracter.test(userData.password)) {
      errors.password =
        "Debe contener al menos uno de los siguientes caracteres especiales: @, #, $, %, ^, &, +, =, !, _ ";
    }
    if (!passwordRegexLength.test(userData.password)) {
      errors.password =
        "La longitud mínima de la contraseña debe ser de 8 caracteres.";
    }
  }

  return errors;
};

export default validationLogin;
