import "./App.css";
import "./style/board.css";
import "./style/itemBox.css";
import { content } from "./content/content";
import { Item } from "./type";
import { useState } from "react";
import Board from "./components/Board";
import { BingoSizeContext } from "./context/BingoSizeContext";

function App() {
  const [bingoSize, setBingoSize] = useState(5);
  const shuffledContent = shuffleContent(bingoSize);

  function shuffleContent(bingoSize: number) {
    const shuffledContent: Item[] = [];
    const contentArr = content
      .slice(0, bingoSize * bingoSize - 1)
      .sort(() => Math.random() - 0.5);

    const contentArrWithFreeSpace = [
      ...contentArr.slice(0, (bingoSize * bingoSize - 1) / 2),
      "Free",
      ...contentArr.slice((bingoSize * bingoSize - 1) / 2),
    ];

    contentArrWithFreeSpace.forEach((el, i) =>
      shuffledContent.push({ id: i + 1, text: el })
    );

    return shuffledContent;
  }

  return (
    <div className="App">
      <div>
        <h1>ZOOMIE BINGO</h1>
        <select
          id="bingoSizeSelect"
          onChange={(e) => setBingoSize(Number(e.target.value))}
          value={bingoSize}
        >
          {[3, 5].map((el) => (
            <option value={el}>
              {el}x{el}
            </option>
          ))}
        </select>
        <BingoSizeContext.Provider value={{ bingoSize }}>
          <Board shuffledContent={shuffledContent} />
        </BingoSizeContext.Provider>
      </div>
    </div>
  );
}

export default App;
