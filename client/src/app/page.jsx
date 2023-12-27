"use client";
import { useRouter } from "next/navigation";
import FormRecord from "@/components/FormRecord/FormRecord";

const App = () => {
  const router = useRouter();

  const handleRouter = () => {
    router.push("/home");
  };

  return (
    <>
      {/* <FormRecord /> */}
      {/* <button onClick={() => handleRouter()}>ACEPTAR</button> */}
      {/* <h3>Registrar o iniciar sesion</h3> */}
      <h1>100</h1>
      <div>
        <button>INCREMENT</button>
      </div>
      <div>
        <button>DECREMENT</button>
      </div>
    </>
  );
};
export default App;
