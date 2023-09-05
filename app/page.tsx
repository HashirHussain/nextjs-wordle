import Game from "./Game";
import data from "./data/four-letter-words.json";

export default async function Home() {
  const data: { wordsList: Array<string> } = await getData();

  return (
    <section className="flex flex-col justify-center m-auto max-w-2xl w-full relative">
      <div className="flex flex-col justify-center items-center gap-10">
        <Game wordsList={data.wordsList} />
      </div>
    </section>
  );
}

async function getData() {
  const wordsList = [...data];

  return { wordsList };
}
