import Game from "./Game";
import { getChosenAnswer } from "./lib";
import data from "./data/four-letter-words.json";

export default async function Home() {
  const data: { words: Array<string>; correctAnswer: string } = await getData();

  return (
    <section className="flex flex-col justify-center m-auto max-w-2xl w-full relative">
      <div className="flex flex-col justify-center items-center gap-10">
        <Game words={data.words} correctAnswer={data.correctAnswer} />
      </div>
    </section>
  );
}

async function getData() {
  const words = [...data];
  const correctAnswer = getChosenAnswer(words);

  return { words, correctAnswer };
}
