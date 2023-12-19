import Cards from "../../components/Cards/Cards";

const loadPokemonApi = async () => {
  const dataInfo = await fetch("http://localhost:3000/server/pokemon");
  const dataJson = await dataInfo.json();
  return dataJson;
};

const Home = async () => {
  const data = (await loadPokemonApi()).dataPokemon;
  return (
    <>
      <h4>Home</h4>
      <Cards dataCards={data} />
    </>
  );
};

export default Home;
