import React, { useState, useEffect, useContext } from "react";
import { Item } from "../type";
import ItemBox from "./ItemBox";
import { BingoSizeContext } from "../context/BingoSizeContext";

function Board({ shuffledContent }: { shuffledContent: Item[] }) {
  const { bingoSize } = useContext(BingoSizeContext);
  const [bingoCount, setBingoCount] = useState(0);
  const [anounceBingo, setAnounceBingo] = useState(false);
  const [selectedArr, setSelectedArr] = useState(initializeSelectedArr());

  useEffect(() => {
    countBingo();
  }, [selectedArr]);

  useEffect(() => {
    setSelectedArr(initializeSelectedArr());
  }, [bingoSize]);

  function initializeSelectedArr() {
    return [
      ...new Array((bingoSize - 1) / 2).fill(new Array(bingoSize).fill(0)),
      [
        ...new Array((bingoSize - 1) / 2).fill(0),
        1,
        ...new Array((bingoSize - 1) / 2).fill(0),
      ],
      ...new Array((bingoSize - 1) / 2).fill(new Array(bingoSize).fill(0)),
    ];
  }

  function countBingo() {
    let count = 0;

    function countRows(matrix: number[][]) {
      const rowCountArr = matrix.map((row) => row.every((el) => el === 1));
      const rowCount = rowCountArr.filter((row) => row === true).length;

      return rowCount;
    }

    function transpose(matrix: number[][]) {
      let res: number[][] = [];
      for (let i = 0; i < matrix[0].length; i++) {
        res[i] = [];
        for (let j = 0; j < matrix.length; j++) {
          res[i][j] = matrix[j][i];
        }
      }
      return res;
    }

    function announceBingo() {
      setAnounceBingo(true);
      setTimeout(() => {
        setAnounceBingo(false);
      }, 2000);
    }

    //row
    count += countRows(selectedArr);

    //column
    const reversedArr = transpose(selectedArr);
    count += countRows(reversedArr);

    //diagonal
    const fromLeftTop = [];
    const fromRightTop = [];
    for (let i = 0; i < bingoSize; i++) {
      fromLeftTop.push(selectedArr[i][i]);
      fromRightTop.push(selectedArr[i][bingoSize - 1 - i]);
    }
    if (fromLeftTop.every((el) => el === 1)) {
      count++;
    }
    if (fromRightTop.every((el) => el === 1)) {
      count++;
    }

    //update the count
    if (count !== bingoCount) {
      setBingoCount(count);
      if (count > bingoCount) {
        announceBingo();
      }
    }
  }

  return (
    <div className="board">
      {anounceBingo && <h1 id="anounceBingo">{bingoCount} Bingo!</h1>}
      <span id="bingoCount"> Bingo: {bingoCount}</span>
      <div
        id="boardGrid"
        style={{
          gridTemplateColumns: `repeat(${bingoSize}, 1fr)`,
          gridTemplateRows: `repeat(${bingoSize}, 1fr)`,
        }}
      >
        {shuffledContent.map((el) => (
          <ItemBox
            item={el}
            selectedArr={selectedArr}
            setSelectedArr={setSelectedArr}
          />
        ))}
      </div>
    </div>
  );
}

export default Board;
