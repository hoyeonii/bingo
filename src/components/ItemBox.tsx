import { useState, useEffect, useContext } from "react";
import { Item } from "../type";
import { BingoSizeContext } from "../context/BingoSizeContext";

interface ItemBoxI {
  item: Item;
  selectedArr: number[];
  setSelectedArr: (
    value: number[] | ((selectedArr: number[]) => number[])
  ) => void;
}

function ItemBox({
  item: { id, text },
  selectedArr,
  setSelectedArr,
}: ItemBoxI) {
  const { bingoSize } = useContext(BingoSizeContext);
  const [selected, setSelected] = useState(
    id === (bingoSize * bingoSize + 1) / 2 ? true : false
  );

  useEffect(() => {
    setSelected(id === (bingoSize * bingoSize + 1) / 2 ? true : false);
  }, [bingoSize]);

  function handleSelect() {
    if (id === (bingoSize * bingoSize + 1) / 2) return;
    const updatedArr = JSON.parse(JSON.stringify(selectedArr));

    updatedArr[Math.floor((id - 1) / bingoSize)][(id - 1) % bingoSize] =
      selected ? 0 : 1;

    setSelected((prep) => !prep);
    setSelectedArr(updatedArr);
  }

  return (
    <div
      id="itemBox"
      style={{
        backgroundColor: selected
          ? "rgba(255, 255, 255,1)"
          : "rgba(255, 255, 255,.7)",
        fontWeight: selected ? "bold" : "normal",
      }}
      onClick={handleSelect}
    >
      <span>{text}</span>
    </div>
  );
}

export default ItemBox;
