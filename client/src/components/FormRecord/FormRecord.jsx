// COMPONET'S

// HOOK'S
import { useState, useEffect } from "react";

//REDUX

//JAVASCRIP
import loginValidate from "@/helpers/loginValidate";
import { data } from "autoprefixer";

// STYLESHEET'S

const Login = () => {
  const [passwordView, setPasswordView] = useState(false);
  const [optionForm, setOptionForm] = useState("login");
  const [error, setError] = useState({});
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
    // try {
    //   const responseData = await fetch(`http://localhost:3000/server/login`, {
    //     method: `POST`,
    //     body: JSON.stringify(inputData),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   const { access, message, data } = await responseData.json();
    //   if (!access) {
    //     throw Error(access);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
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
          {error.email && <p className="error">{error.email}</p>}
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
          {error.password && <p className="error">{error.password}</p>}
        </div>
        <div>
          <button type="button" onClick={() => setPasswordView(!passwordView)}>
            {passwordView ? "Ocultar" : "Mostrar"} contraseña
          </button>
        </div>

        <button type="submit">Login</button>
      </form>
    </>
  );
};
export default Login;
