import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * Main container component for TicTacToe Classic.
 * - Two player mode (same device)
 * - Game state tracking (board state, player turn)
 * - Win/Draw detection and announcement
 * - Full retro arcade/console-inspired theming.
 */
function TicTacToeGame() {
  // State
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState({ winner: null, draw: false });

  // Retro palette and styles
  // Colors: mint green, cream, brick red, black, beige
  const PRIMARY = "#f4ecd8";      // Cream/Beige
  const SECONDARY = "#222122";    // Deep retro black
  const ACCENT = "#48a14d";       // Mint green
  const ACCENT2 = "#7c2f1d";      // Brick-red
  const HIGHLIGHT = "#b5ffd5";
  const SHADOW = "#2e2e38";       // Shadow/retro border

  // Pixel/arcade font family as fallback
  const RETRO_FONT = `"Press Start 2P", "Fira Mono", "Consolas", "Courier New", monospace`;
  // For best effect: Press Start 2P or similar retro pixels, with good fallbacks if not available

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
          color: board[idx] === "X" ? ACCENT2 : ACCENT,
          background: PRIMARY,
          borderColor: SHADOW,
          cursor: board[idx] || status.winner || status.draw ? "not-allowed" : "pointer",
          // Apply retro drop shadow/3d effect via boxShadow
          fontFamily: RETRO_FONT,
          textShadow: board[idx]
            ? `2px 2px 0px ${HIGHLIGHT}, 0px 2px 0px ${SHADOW}`
            : `1px 1px 0px ${HIGHLIGHT}`,
        }}
        aria-label={`TicTacToe square ${idx + 1}${board[idx] ? ': ' + board[idx] : ''}`}
        tabIndex={status.winner || status.draw ? -1 : 0}
      >
        {board[idx]}
      </button>
    );
  }

  // Status text
  let header;
  if (status.winner) {
    header = (
      <div
        className="ttt-status"
        style={{
          color: ACCENT2,
          fontWeight: 700,
          fontFamily: RETRO_FONT,
          letterSpacing: "2px",
          background: "#fff9e6",
          border: `3px solid ${ACCENT2}`,
          boxShadow: `2px 2px 0px ${SHADOW}`,
          padding: "6px 14px",
          borderRadius: "6px",
          marginBottom: 6,
          marginTop: 2
        }}
      >
        {`Player ${status.winner} WINS!`}
      </div>
    );
  } else if (status.draw) {
    header = (
      <div
        className="ttt-status"
        style={{
          color: ACCENT2,
          fontWeight: 700,
          fontFamily: RETRO_FONT,
          background: "#fff9e6",
          border: `3px solid ${ACCENT2}`,
          boxShadow: `2.5px 2.5px 0px ${SHADOW}`,
          padding: "6px 16px",
          borderRadius: "6px",
          letterSpacing: "1.5px",
          marginBottom: 6,
          marginTop: 2
        }}
      >
        IT'S A DRAW!
      </div>
    );
  } else {
    header = (
      <div
        className="ttt-status"
        style={{
          color: ACCENT,
          fontWeight: 800,
          fontFamily: RETRO_FONT,
          letterSpacing: "2px",
          textShadow: `1.5px 1.5px 0px ${HIGHLIGHT}, 0 1.5px 2px ${SHADOW}`,
          padding: "3px 8px",
          marginBottom: 6,
        }}
      >
        PLAYER {xIsNext ? "X" : "O"}'S TURN
      </div>
    );
  }

  return (
    <div
      className="ttt-retro-container"
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: PRIMARY,
        border: `6px double ${SHADOW}`,
        boxShadow: `0 0 0 6px ${ACCENT}, 8px 8px 0px 0px ${SHADOW}`,
        maxWidth: 340,
        margin: "48px auto",
        padding: "20px 10px 24px 10px",
        borderRadius: "16px",
        fontFamily: RETRO_FONT,
        position: "relative",
        outline: `4px solid ${ACCENT2}`,
      }}
    >
      {header}
      <div
        className="ttt-board"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 64px)",
          gridTemplateRows: "repeat(3, 64px)",
          gap: 8,
          margin: "20px 0 10px 0",
        }}
      >
        {Array(9)
          .fill(0)
          .map((_, idx) => renderSquare(idx))}
      </div>
      <button
        className="ttt-reset"
        style={{
          marginTop: 10,
          padding: "9px 24px 9px 24px",
          background: ACCENT2,
          color: PRIMARY,
          border: `3px solid ${SECONDARY}`,
          boxShadow: `2.5px 2.5px 0px ${SHADOW}`,
          fontWeight: 900,
          fontFamily: RETRO_FONT,
          fontSize: "0.97rem",
          textTransform: "uppercase",
          cursor: "pointer",
          borderRadius: 8,
          letterSpacing: "2px",
          outline: `2px solid ${ACCENT}`,
          transition: "background 0.18s, transform 0.1s",
          textShadow: `1px 1px 0px ${HIGHLIGHT}, 0 1.5px 2px ${SHADOW}`,
        }}
        onClick={handleReset}
        data-testid="reset-btn"
      >
        Reset Game
      </button>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        .ttt-square {
          width: 64px;
          height: 64px;
          background: ${PRIMARY};
          font-size: 2.25rem;
          font-family: ${RETRO_FONT};
          font-weight: 900;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 4px solid ${SHADOW};
          border-radius: 5px;
          box-shadow: 3px 3px 0px ${ACCENT};
          outline: 3px solid ${ACCENT2};
          margin: 0;
          padding: 0;
          transition: background 0.08s, transform 0.08s;
          user-select: none;
          position: relative;
        }
        .ttt-square:active {
          background: #e8dec2;
          transform: scale(0.96);
        }
        .ttt-square:focus {
          box-shadow: 0 0 0 3px ${ACCENT};
        }
        .ttt-square:disabled {
          opacity: 0.58;
          cursor: not-allowed;
        }

        .ttt-status {
          font-size: 1.02rem;
          line-height: 1.2;
          text-align: center;
        }

        .ttt-reset:hover,
        .ttt-reset:focus {
          background: ${ACCENT};
          color: ${PRIMARY};
          outline: 4px double ${ACCENT2};
          box-shadow: 4px 4px 0px ${HIGHLIGHT};
          transform: translateY(-2px) scale(1.03);
        }
        .ttt-reset:active {
          background: #512116;
          color: #fffbe1;
        }
        `}
      </style>
    </div>
  );
}

export default TicTacToeGame;
