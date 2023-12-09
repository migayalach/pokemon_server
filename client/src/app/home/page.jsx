import Cards from "../../componets/Cards/Cards";

const loadPokemonApi = async () => {
  const dataInfo = await fetch("https://pokeapi.co/api/v2/pokemon");
  const dataJson = await dataInfo.json();
  return dataJson;
};

const Home = async () => {
  const data = (await loadPokemonApi()).results;
  return (
    <>
      <h4>Home</h4>
      <Cards dataCards={data} />
    </>
  );
};

export default Home;
