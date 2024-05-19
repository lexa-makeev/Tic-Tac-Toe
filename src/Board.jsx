import React from "react";
import Square from "./Square";

function Board({ squares, onClick }) {
    return (
        <div>
            {[0, 3, 6].map((row) => (
                <div className="board-row" key={row}>
                    {[0, 1, 2].map((col) => (
                        <Square
                            key={row + col}
                            value={squares[row + col]}
                            onClick={() => onClick(row + col)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Board;
