import { useState } from "react";
import Board from "./Board";
import "./index.css";

function App() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);

    const current = history[stepNumber];

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const a = lines[i][0];
            const b = lines[i][1];
            const c = lines[i][2];
            if (
                squares[a] &&
                squares[a] === squares[b] &&
                squares[a] === squares[c]
            ) {
                return squares[a];
            }
        }
        return squares.every((square) => square) ? "Draw" : null;
    };

    const winner = calculateWinner(current);

    const handleClick = (index) => {
        if (winner || current[index]) return;

        const newHistory = history.slice(0, stepNumber + 1);
        const newSquares = [...newHistory[stepNumber]];
        newSquares[index] = xIsNext ? "X" : "O";

        setHistory([...newHistory, newSquares]);
        setStepNumber(newHistory.length);
        setXIsNext(!xIsNext);
    };

    const resetGame = () => {
        setHistory([Array(9).fill(null)]);
        setStepNumber(0);
        setXIsNext(true);
    };

    return (
        <div className="game">
            <div className="game-board">
                <Board squares={current} onClick={handleClick} />
            </div>
            <div className="game-info">
                <div>
                    {winner
                        ? winner === "Draw"
                            ? "Ничья"
                            : "Выиграл: " + winner
                        : "Следующий игрок: " + (xIsNext ? "X" : "O")}
                </div>
                <button onClick={resetGame}>Сбросить игру</button>
            </div>
        </div>
    );
}

export default App;
