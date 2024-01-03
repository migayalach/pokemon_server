// COMPONET'S

// HOOK'S
import { useState, useEffect } from "react";
import { useLoginMutation } from "@/redux/services/loginServer";

//REDUX
import { useDispatch, useSelector } from "react-redux";

//JAVASCRIP
import loginValidate from "@/helpers/loginValidate";

// STYLESHEET'S

const Login = () => {
  const dispatch = useDispatch();
  const [login, { data, error, isLoading }] = useLoginMutation();
  const [passwordView, setPasswordView] = useState(false);
  const [optionForm, setOptionForm] = useState("login");
  const [errors, setError] = useState({});
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const handleDataInput = (event) => {
    setInputData({
      ...inputData,
      [event.target.name]: event.target.value,
    });
    setError({
      ...loginValidate({
        ...inputData,
        [event.target.name]: event.target.value,
      }),
    });
  };

  const handleOptionForm = () => {
    optionForm === "login" ? setOptionForm("Check In") : setOptionForm("login");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const result = await login(inputData);
      // Manejar el resultado de la mutación si es necesario
      console.log("Resultado de la mutación:", result.data);
    } catch (error) {
      // Manejar el error de la mutación
      console.error("Error en la llamada a la API:", error);

      // Puedes acceder a la información específica del error
      console.log("Código de error:", error.code);

    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={inputData.email}
            onChange={handleDataInput}
            placeholder="mike@gmail.com"
            className="text-black"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type={passwordView ? "text" : "password"}
            id="password"
            name="password"
            value={inputData.password}
            onChange={handleDataInput}
            placeholder="holaMundo@1"
            className="text-black"
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div>
          <button type="button" onClick={() => setPasswordView(!passwordView)}>
            {passwordView ? "Ocultar" : "Mostrar"} contraseña
          </button>
        </div>
        <button
          className="bg-red-500 hover:bg-blue-700 transition duration-700 text-white font-bold py-2 px-4 rounded-lg w-32 h-10"
          type="submit"
        >
          Login
        </button>
      </form>
    </>
  );
};
export default Login;
