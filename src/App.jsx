import Die from "./components/Die"
import './index.css'
import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import ConfettiComponent from "./components/Confetti";
function App() {
  // gnerate 10 random numbers between 1 and 6
  function generateNewDice() {
    return Array.from({ length: 10 }, () => ({
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    }));
  }

  function onDieClick(id) {
    setDice(prevDice => prevDice.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die));
  }


  const [dice, setDice] = useState(generateNewDice());
  const buttonRef = useRef(null);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  

  const isWon = dice.every(die => die.isHeld && die.value === dice[0].value);

  // Focus the button when the game is won
  useEffect(() => {
    if (isWon && buttonRef.current) {
      buttonRef.current.focus();
      setIsRunning(false); // Stop the timer when game is won
    }
  }, [isWon]);

  // Timer effect
  useEffect(() => {
    let intervalId;
    
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 10); // Update every 10ms
      }, 10);
    }
    
    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  // Format time as mm:ss:ms
  const formatTime = () => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  };

  const diceElements = dice.map((die) => (
    <Die key={die.id} id={die.id} value={die.value} isHeld={die.isHeld} onDieClick={onDieClick} style={die.isHeld ? { backgroundColor: "#59E391" } : {}}/>
  ));

  function rollDice() {
    if (isWon) {
      setDice(generateNewDice());
      setTime(0); // Reset timer
      setIsRunning(true); // Start timer for new game
      return;
    }
    else {
      if (!isRunning) {
        setIsRunning(true); // Start timer on first roll
      }
      setDice(
        dice.map(die => die.isHeld ? die : {...die, value: Math.floor(Math.random() * 6) + 1})
      );
    }
  }

  return (
    <main className="main">
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="timer">{formatTime()}</div>
      <div className="dice-container">
        {diceElements}
      </div>
      <button 
        className="roll-dice" 
        onClick={rollDice}
        ref={buttonRef}
      >
        {isWon ? "New Game" : "Roll"}
      </button>
      {isWon && <ConfettiComponent />}
    </main>
  )
}

export default App
