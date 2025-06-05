import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * Main container component for TicTacToe Classic.
 * - Two player mode (same device)
 * - Game state tracking (board state, player turn)
 * - Win/Draw detection and announcement
 * - Uses theme: light, primary: #ffffff, secondary: #000000, accent: #2196f3
 */
function TicTacToeGame() {
  // State
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState({ winner: null, draw: false });

  // Constants for theme/colors
  const PRIMARY = "#ffffff";
  const SECONDARY = "#000000";
  const ACCENT = "#2196f3";

  // Winning lines
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

  // PUBLIC_INTERFACE
  function handleSquareClick(idx) {
    if (board[idx] || status.winner || status.draw) return;
    const newBoard = board.slice();
    newBoard[idx] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    const res = calculateWinnerOrDraw(newBoard);
    setStatus(res);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setStatus({ winner: null, draw: false });
  }

  // PUBLIC_INTERFACE
  function calculateWinnerOrDraw(b) {
    for (let l of lines) {
      const [a, b1, c] = l;
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
        return { winner: b[a], draw: false };
      }
    }
    if (b.every(Boolean)) {
      return { winner: null, draw: true };
    }
    return { winner: null, draw: false };
  }

  // Render helpers
  function renderSquare(idx) {
    return (
      <button
        className="ttt-square"
        onClick={() => handleSquareClick(idx)}
        style={{
          color: board[idx] === "X" ? ACCENT : SECONDARY,
          background: PRIMARY,
          borderColor: ACCENT,
          cursor: board[idx] || status.winner || status.draw ? "not-allowed" : "pointer",
        }}
        aria-label={`TicTacToe square ${idx+1}${board[idx] ? ': '+board[idx] : ''}`}
      >
        {board[idx]}
      </button>
    );
  }

  // Status text
  let header;
  if (status.winner) {
    header = (
      <div className="ttt-status" style={{ color: ACCENT, fontWeight: 600 }}>
        {`Player ${status.winner} wins!`}
      </div>
    );
  } else if (status.draw) {
    header = (
      <div className="ttt-status" style={{ color: ACCENT, fontWeight: 600 }}>
        It's a draw!
      </div>
    );
  } else {
    header = (
      <div className="ttt-status" style={{ color: SECONDARY, fontWeight: 500 }}>
        Player {xIsNext ? "X" : "O"}'s turn
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: PRIMARY,
        borderRadius: 16,
        boxShadow: "0 4px 32px rgba(33,150,243,0.06)",
        maxWidth: 360,
        margin: "48px auto",
        padding: "24px 12px 28px 12px"
      }}
    >
      {header}
      <div
        className="ttt-board"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 60px)",
          gridTemplateRows: "repeat(3, 60px)",
          gap: 6,
          margin: "24px 0"
        }}
      >
        {Array(9)
          .fill(0)
          .map((_, idx) => renderSquare(idx))}
      </div>
      <button
        className="ttt-reset"
        style={{
          marginTop: 8,
          padding: "10px 24px",
          background: ACCENT,
          color: PRIMARY,
          border: "none",
          borderRadius: 6,
          fontWeight: 600,
          fontSize: "1rem",
          cursor: "pointer",
          letterSpacing: "1px",
          boxShadow: "0 1px 8px rgba(33,150,243,0.08)"
        }}
        onClick={handleReset}
        data-testid="reset-btn"
      >
        Reset Game
      </button>
      <style>
        {`
        .ttt-square {
          width: 60px;
          height: 60px;
          font-size: 2rem;
          font-weight: bold;
          border: 2px solid ${ACCENT};
          border-radius: 8px;
          outline: none;
          background: ${PRIMARY};
          transition: background 0.15s;
        }
        .ttt-square:focus {
          box-shadow: 0 0 0 2px ${ACCENT}66;
        }
        .ttt-status {
          font-size: 1.3rem;
          margin-bottom: 8px;
        }
        .ttt-reset:active {
          background: #1766b2;
        }
        `}
      </style>
    </div>
  );
}

export default TicTacToeGame;
