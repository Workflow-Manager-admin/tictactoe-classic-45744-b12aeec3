import React from 'react';
import './App.css';
import TicTacToeGame from './TicTacToeGame';

// PUBLIC_INTERFACE
function App() {
  // Retro palette and font
  const RETRO_FONT = `"Press Start 2P", "Fira Mono", "Consolas", "Courier New", monospace`;
  const CREAM = "#f4ecd8";
  const MINT = "#48a14d";
  const BRICK = "#7c2f1d";
  const DARK = "#222122";
  const SHADOW = "#2e2e38";

  return (
    <div
      className="app"
      style={{
        background: DARK,
        minHeight: "100vh",
        fontFamily: RETRO_FONT,
      }}
    >
      <nav
        className="navbar"
        style={{
          background: BRICK,
          borderBottom: `4px solid ${SHADOW}`,
          fontFamily: RETRO_FONT,
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo" style={{ color: CREAM, letterSpacing: 2 }}>
              <span
                className="logo-symbol"
                style={{
                  color: MINT,
                  fontWeight: 700,
                  fontFamily: RETRO_FONT,
                  textShadow: `2px 2px 0px ${SHADOW}`,
                  marginRight: 6
                }}
              >▨</span>
              KAVIA AI
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontFamily: RETRO_FONT,
            marginTop: "98px"
          }}
        >
          <h1
            className="title ttt-retro-title"
            style={{
              fontSize: "2.05rem",
              fontWeight: "900",
              color: BRICK,
              background: CREAM,
              border: `4px double ${MINT}`,
              textAlign: "center",
              marginBottom: "24px",
              marginTop: "12px",
              letterSpacing: "2.5px",
              fontFamily: RETRO_FONT,
              padding: "6px 10px",
              textShadow: `2px 2px 0 ${SHADOW}, 0 0 1px ${MINT}`,
              borderRadius: "6px",
              boxShadow: `3px 3px 0px ${SHADOW}`,
              textTransform: "uppercase",
            }}
          >
            TicTacToe Classic
          </h1>
          <TicTacToeGame />
        </div>
      </main>
      {/* App-level retro style override */}
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        `}
      </style>
    </div>
  );
}

export default App;