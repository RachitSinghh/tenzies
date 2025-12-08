import { useState, useRef, useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState(() => getRandomValue());
  const buttonRef = useRef(null);

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  useEffect(() => {
    if(gameWon){
      buttonRef.current.focus()
    }
  }, [gameWon]);

  function getRandomValue() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die,
      ),
    );
  }
  /*
    die.id === id => checks if the die.id is equal to input id
    {...die, isHeld: !die.isHeld} => i will create a new object and ...die represent that i want my all the property of my old dice but !die.isHeld will change flip the value in short every value will remain same except the isHeld value.
    : die => this will simply return the value we have currently
  */

  const diceElement = dice.map((num) => (
    <Die
      key={num.id}
      value={num.value}
      isHeld={num.isHeld}
      hold={() => holdDice(num.id)}
    />
  ));

  function rollTheDice() {
    // SetDice(new Array(10).fill(0).map(() => Math.ceil(Math.random() * 6)));
    // setDice(getRandomValue()); Main issue: the Roll button ignores held dice. rollTheDice replaces the whole dice array with fresh random values, so isHeld never matters—every roll rerolls all dice.
    setDice(
      (oldDice) =>
        oldDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) },
        ),
      // reroll only unheld dice and leave held ones untouched.
    );
  }

  function resetGame() {
    setDice(getRandomValue);
  }

  function startNewGame() {
    if (gameWon) {
      resetGame();
    } else {
      rollTheDice();
    }
  }

  return (
    <div className="container">
      {gameWon && gameWon && <Confetti />}
      <div className="title-container">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </div>
      <div className="dice-Container">{diceElement}</div>
      <button ref={buttonRef} className="rollTheDice" onClick={startNewGame}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </div>
  );
}
