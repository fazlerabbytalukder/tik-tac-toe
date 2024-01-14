import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      onClick={onSquareClick}
      className="bg-white border border-gray-400 h-12 w-12 m-1 leading-9 text-lg">
      {value}
    </button>
  );
}


function Board({ isNext, squares, onPlay }) {


  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = `Winner:${winner}`;
  } else {
    status = "Next Player:" + (isNext ? "X" : "O");
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    else {
      const nextSquares = squares.slice();
      if (isNext) {
        nextSquares[i] = 'X';
      } else {
        nextSquares[i] = 'O';
      }
      onPlay(nextSquares);
    }
  }

  return (
    <>
      <div>{status}</div>
      <div className="flex">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div className="flex">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div className="flex">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [isNext, setIsNext] = useState(true);
  const [currectMove, setCurrectMove] = useState(0);

  const currentSquares = history[currectMove];

  function handlePlay(nextSquares) {
    setIsNext(!isNext);
    const nextHistory = [...history.slice(0, currectMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrectMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrectMove(move);
    setIsNext(move % 2 == 0);
  }

  const moves = history.map((squares, move) => {
    let description;

    if (move > 0) {
      description = `Go to the move # ${move}`;
    } else {
      description = `Go to start the game`;
    }

    return (
      <div>
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      </div>
    )
  })

  return (
    <div className="flex justify-center p-3">
      <div className="mr-16">
        <Board isNext={isNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div>
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  );
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}