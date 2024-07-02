import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState({ x: 1, y: 1 });

  const toggleStyle = () => {
    setDarkMode(!darkMode);
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prevPosition => {
        let newX = prevPosition.x + direction.x * 2;
        let newY = prevPosition.y + direction.y * 2;

        if (newX > 250 || newX < 0) {
          setDirection(prevDirection => ({ ...prevDirection, x: -prevDirection.x }));
          newX = Math.max(0, Math.min(newX, 250));
        }

        if (newY > 250 || newY < 0) {
          setDirection(prevDirection => ({ ...prevDirection, y: -prevDirection.y }));
          newY = Math.max(0, Math.min(newY, 250));
        }

        return { x: newX, y: newY };
      });
    }, 30);

    return () => clearInterval(interval);
  }, [direction]);

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <header className="App-header">
        <h1>Hello World!</h1>
        <button onClick={toggleStyle}>
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
        <div className="box">
          <div
            className="moving-content"
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`
            }}
          ></div>
        </div>
      </header>
    </div>
  );
}

export default App;
