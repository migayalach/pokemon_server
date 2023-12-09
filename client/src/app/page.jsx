"use client";
import { useRouter } from "next/navigation";
import FormRecord from "@/componets/FormRecord/FormRecord";

const App = () => {
  const router = useRouter();

  const handleRouter = () => {
    router.push("/home");
  };

  return (
    <>
      <h1>Login</h1>
      <FormRecord />
      <button onClick={() => handleRouter()}>ACEPTAR</button>
    </>
  );
};
export default App;
