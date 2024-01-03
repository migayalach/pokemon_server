"use client";
import { useRouter } from "next/navigation";
import FormRecord from "@/components/FormRecord/FormRecord";
import React from "react";

const App = () => {
  const router = useRouter();

  const handleRouter = (info) => {
    info.access ? router.push("/home") : alert(info.message);
  };

  return (
    <>
      <FormRecord handleRouter={handleRouter} />
      <h3>Registrar o iniciar sesion</h3>
    </>
  );
};
export default App;
