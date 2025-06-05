import React from 'react';
import './App.css';
import TicTacToeGame from './TicTacToeGame';

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="container" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <h1 className="title" style={{
            fontSize: "2.3rem",
            fontWeight: "700",
            color: "#2196f3",
            textAlign: "center",
            marginBottom: "18px",
            marginTop: "100px",
            letterSpacing: "0.5px"
          }}>TicTacToe Classic</h1>
          <TicTacToeGame />
        </div>
      </main>
    </div>
  );
}

export default App;