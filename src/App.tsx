import React, { useState } from "react";
import axios from "axios";

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i: number) {
    const newSquares = squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  function renderSquare(i: number) {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    <div className="status text-2xl font-semibold mb-4 text-cyan-500">
      Winner: {winner}
    </div>
    status = "Winner is: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }


  const restart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
        <RandomFact />
        <div className="title text-5xl font-bold text-white mb-4">Tic Tac Toe</div>
        <div className="status text-2xl font-semibold mb-4 text-cyan-500"> {status} </div>
        <div className="card flex flex-col items-center justify-center w-auto bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 rounded-3xl">
          <div className="board-row flex w-auto">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row flex">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row flex">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
        <div className="button flex justify-center mt-8">
          <RestartButton onClick={restart} />
        </div>
      </div>
    </>
  );
}


function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;



//Square component 
export type SquareProps = {
  value: string;
  onClick: () => void;
};

export function Square(props: SquareProps) {
  const { value, onClick } = props;

  return (
    //make each square a button separted by a space in between
    <button className="w-24 h-24 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 hover:from-gray-600 hover:via-gray-500 hover:to-gray-400 transform hover:scale-105 transition duration-300 text-white font-bold py-2 px-4 rounded m-2"
      onClick={onClick}>
      <h1 className="text-6xl font-bold font-sans">{value}</h1>
    </button>
  );
}




//Restart button component

export function RestartButton(props: any) {
  const { onClick } = props;

  return (
    <button className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 hover:from-gray-600 hover:via-gray-500 hover:to-gray-400 transform hover:scale-105 transition duration-300 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}>
      Restart
    </button>
  );
}



//Random Fact Generator
export function RandomFact() {
  const [fact, setFact] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getFact = async () => {
    try {

      setLoading(true);
      const response = await axios.get("https://api.chucknorris.io/jokes/random");
      setFact(response.data.value);
      setLoading(false);
    } catch (error) {

      setLoading(false);
      setFact("Error");
    }


  }


  return (
    <>
      <div className="flex flex-col items-center justify-center mb-16">
        <div className="text-lg font-semibold mb-4 text-white">Random Chuck Norris Fact</div>
        <div className="text-sm font-semibold mb-4 text-cyan-500">{loading ? "Loading..." : fact}</div>
        <button className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 hover:from-gray-600 hover:via-gray-500 hover:to-gray-400 transform hover:scale-105 transition duration-300 text-white font-bold py-2 px-4 rounded"
          onClick={getFact}>
          Get Fact
        </button>
      </div>
    </>
  );
}
