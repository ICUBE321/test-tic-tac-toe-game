import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "react-bootstrap/Image";

import shared from "../shared.module.css";
import styles from "./game.module.css";

//square component function to display each square on the board
const Square = (props) => {
  return (
    <button className={styles.square} onClick={props.onClick}>
      {props.value}
    </button>
  );
};

//board component to setup and display the game board
const Board = (props) => {
  //render each square
  const renderSquare = (i) => {
    // console.log("Square value: " + props.squares);
    return <Square value={props.squares[i]} onClick={() => props.onClick(i)} />;
  };

  return (
    <div className={styles["game-board"]}>
      <div className={styles["board-row"]}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className={styles["board-row"]}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className={styles["board-row"]}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

//game component that shows the entire game
const Game = (props) => {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
    },
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [winner, setWinner] = useState();
  const [timer, setTimer] = useState(0);
  const [playerX, setPlayerX] = useState();
  const [playerO, setPlayerO] = useState();
  const [imageOne, setImageOne] = useState();
  const [imageTwo, setImageTwo] = useState();

  let intervalHolder;

  useEffect(() => {
    getFromSearch();
    startTimer();
  }, []);

  useEffect(() => {
    if (stepNumber > 0) {
      let status;
      let result = calculateWinner(history[stepNumber].squares);
      if (result != null) {
        stopTimer();
        status = "Winner: " + result;
        onSaveGamelog(result, result === "O" ? "X" : "O");
        setWinner(result);
      } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
      }
      console.log(status);
    }
  }, [xIsNext]);

  const getFromSearch = () => {
    const urlParams = new URLSearchParams(window.location.search);
    setPlayerX(urlParams.get("PlayerX"));
    setPlayerO(urlParams.get("PlayerO"));
    setImageOne(urlParams.get("URL1"));
    setImageTwo(urlParams.get("URL2"));
  };

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
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const onSaveGamelog = (winnerTag, loserTag) => {
    const gamelog = {
      playtime: timer,
      winner: winnerTag,
      loser: loserTag,
      date: new Date(),
      playerX: playerX,
      playerO: playerO,
    };

    axios
      .post("/api/gamelog/add", gamelog)
      .then((res) => console.log(res.data));

    if (window.confirm("Send game score to email address?")) {
      console.log("Sending to email...");
      window.location.href =
        "/email?Winner=" +
        gamelog.winner +
        "&PlayerX=" +
        gamelog.playerX +
        "&PlayerO=" +
        gamelog.playerO;
    } else {
      console.log("Not sending to email...");
      window.location = "/";
    }
  };

  const startTimer = () => {
    intervalHolder = setInterval(
      () => setTimer((prevTime) => prevTime + 1),
      1000
    );
    console.log("timer started");
  };

  const stopTimer = () => {
    console.log("timer stopped");
    clearInterval(intervalHolder);
  };

  const handleClick = (i) => {
    if (winner != null) {
      return;
    } else if (history[stepNumber].squares[i] != null) {
      return;
    }
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    squares[i] = xIsNext ? "X" : "O";
    setHistory(
      history.concat([
        {
          squares: squares,
        },
      ])
    );
    setStepNumber(history.length);
    setXIsNext(!xIsNext);
  };

  // const jumpTo = (step) => {
  //   this.setState({
  //     stepNumber: step,
  //     xIsNext: step % 2 === 0,
  //   });
  // };

  // const moves = history.map((step, move) => {
  //   const desc = move ? "Go to move #" + move : "Go to game start";
  //   return (
  //     <li key={move}>
  //       <button onClick={() => this.jumpTo(move)}>{desc}</button>
  //     </li>
  //   );
  // });
  return (
    <div className={`${shared["shared-container"]} ${styles.game}`}>
      <>
        <Board
          squares={history[stepNumber].squares}
          onClick={(i) => handleClick(i)}
        />
      </>
      <div className={styles["game-info"]}>
        {/* <div>{status}</div> */}
        {/* <ol>{moves}</ol> */}
      </div>
      <div className={styles["player-tags"]}>
        <div className={styles.player}>
          <label>PLAYER X: {playerX}</label>
          <Image src={imageOne} thumbnail className={styles.image} />
        </div>
        <h1>VS</h1>
        <div className={styles.player}>
          <label>PLAYER O: {playerO}</label>
          <Image src={imageTwo} thumbnail className={styles.image} />
        </div>
      </div>
    </div>
  );
};

export default Game;
