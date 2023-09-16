import Game from "./Game";
import data from "./data/word-bank.json";

export default async function Home() {
  const data: { wordsList: Array<string> } = await getData();

  return (
    <Game wordsList={data.wordsList} />
  );
}

async function getData() {
  const wordsList = [...data];

  return { wordsList };
}
