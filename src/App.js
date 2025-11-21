import React, { useState, useEffect } from 'react';
import './App.css';

function getSavedScore() {
  const score = localStorage.getItem('clicker_score');
  return score ? parseInt(score, 10) : 0;
}
function getSavedMultiplier() {
  const mul = localStorage.getItem('clicker_multiplier');
  return mul ? parseInt(mul, 10) : 1;
}

function App() {
  const [score, setScore] = useState(getSavedScore());
  const [multiplier, setMultiplier] = useState(getSavedMultiplier());
  const [colorIdx, setColorIdx] = useState(0);
  const colors = ['#f96c6c', '#6cf984', '#6cc7f9', '#e36cf9', '#ffc36c', '#6cf9d2', '#f96cdc'];
  
  useEffect(() => {
    localStorage.setItem('clicker_score', score);
  }, [score]);

  useEffect(() => {
    localStorage.setItem('clicker_multiplier', multiplier);
  }, [multiplier]);

  const handleClick = () => {
    setScore(prev => prev + multiplier);
    setColorIdx(prev => (prev + 1) % colors.length);
  };

  const handleUpgrade = () => {
    if (score >= 50 * multiplier) {
      setScore(score - 50 * multiplier);
      setMultiplier(multiplier + 1);
    }
  };

  return (
    <div className="App" style={{ background: `linear-gradient(135deg, ${colors[colorIdx]} 60%, #fff 100%)` }}>
      <header className="App-header">
        <h1 style={{ color: colors[(colorIdx + 3) % colors.length] }}>Colorful Clicker!</h1>
        <p className="score">Score: <span>{score}</span></p>
        <button className="big-click" style={{ background: colors[(colorIdx + 1) % colors.length] }} onClick={handleClick}>
          Click Me!
        </button>
        <div className="upgrade-block">
          <button className="upgrade-btn" onClick={handleUpgrade} disabled={score < 50 * multiplier}>
            Upgrade (+1 per click) [{50 * multiplier} pts]
          </button>
          <p>Current Multiplier: <b>{multiplier}x</b></p>
        </div>
      </header>
    </div>
  );
}

export default App;
