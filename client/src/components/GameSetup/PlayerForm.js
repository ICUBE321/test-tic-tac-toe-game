import axios from "axios";
import React, { useState, useRef, useEffect } from "react";

import shared from "../shared.module.css";
import styles from "./PlayerForm.module.css";

import Card from "../UI/Card";
import Button from "../UI/Button";
import Image from "react-bootstrap/Image";

const PlayerForm = (props) => {
  const playerXInputRef = useRef();
  const playerOInputRef = useRef();

  const [players, setPlayers] = useState([]);
  const [imageOne, setImageOne] = useState("");
  const [imageTwo, setImageTwo] = useState("");

  const randomDogURL =
    "https://secret-ocean-49799.herokuapp.com/http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true";

  useEffect(() => {
    axios
      .get("/api/player/")
      .then((response) => {
        if (response.data.length > 0) {
          setPlayers(response.data.map((player) => player.username));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getPlayerOneImage = () => {
    axios.get(randomDogURL).then((response) => {
      setImageOne(response.data[0]);
    });
  };

  const getPlayerTwoImage = () => {
    axios.get(randomDogURL).then((response) => {
      setImageTwo(response.data[0]);
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const playerX = {
      username: playerXInputRef.current.value,
    };
    const playerO = {
      username: playerOInputRef.current.value,
    };

    if (
      playerX.username.trim().length < 3 ||
      playerX.username === null ||
      playerO.username.trim().length < 3 ||
      playerO.username === null
    ) {
      alert("Enter player names!");
    } else {
      if (!players.includes(playerX.username)) {
        axios
          .post("/api/player/add", playerX)
          .then((res) => console.log(res.data))
          .catch((error) => {
            console.log("Error while adding player: " + error);
          });
      }

      if (!players.includes(playerO.username)) {
        axios
          .post("/api/player/add", playerO)
          .then((res) => console.log(res.data))
          .catch((error) => {
            console.log("Error while adding player: " + error);
          });
      }
      window.location.href =
        "/game?PlayerX=" +
        playerX.username +
        "&PlayerO=" +
        playerO.username +
        "&URL1=" +
        imageOne +
        "&URL2=" +
        imageTwo;
    }
  };

  return (
    <div className={`${shared["shared-container"]} ${styles["player-form"]}`}>
      <h1 className={styles.heading}>Select Your Tags</h1>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <div className={styles.cards}>
          <Card className={`${styles["player-card"]}`}>
            <label>Player X</label>
            <input
              type="text"
              list="usernames1"
              className="form-control"
              ref={playerXInputRef}
            />
            <datalist id="usernames1">
              {players.map(function (player1) {
                return <option key={player1}>{player1}</option>;
              })}
            </datalist>
            <div className={styles["image-group"]}>
              <Image src={imageOne} thumbnail width="171" />
              <Button
                type="button"
                className={styles.btn}
                onClick={getPlayerOneImage}
              >
                Random Icon
              </Button>
            </div>
          </Card>
          <Card className={`${styles["player-card"]}`}>
            <label>Player O</label>
            <input
              type="text"
              list="usernames2"
              className="form-control"
              ref={playerOInputRef}
            />

            <datalist id="usernames2">
              {players.map(function (player2) {
                return <option key={player2}>{player2}</option>;
              })}
            </datalist>
            <div className={styles["image-group"]}>
              <Image src={imageTwo} thumbnail width="171" />
              <Button
                type="button"
                className={styles.btn}
                onClick={getPlayerTwoImage}
              >
                Random Icon
              </Button>
            </div>
          </Card>
        </div>
        <div className={styles["form-button"]}>
          <Button type="submit" className={styles["start-button"]}>
            Start Game
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PlayerForm;
