"use client";
import { useRouter } from "next/navigation";
import FormRecord from "@/components/FormRecord/FormRecord";
import React from "react";

const App = () => {
  const router = useRouter();

  const handleRouter = () => {
    router.push("/home");
  };

  return (
    <>
      <FormRecord />
      <button onClick={() => handleRouter()}>ACEPTAR</button>
      <h3>Registrar o iniciar sesion</h3>
    </>
  );
};
export default App;
