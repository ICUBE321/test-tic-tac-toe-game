import React, { useState, useEffect } from "react";
import axios from "axios";

import shared from "../shared.module.css";
import styles from "./gamelogs.module.css";

const Gamelog = (props) => (
  <tr className={styles.trow}>
    <td>{props.gamelog.playtime}</td>
    <td>{props.gamelog.winner}</td>
    <td>{props.gamelog.loser}</td>
    <td>{props.gamelog.playerX}</td>
    <td>{props.gamelog.playerO}</td>
    <td>{props.gamelog.date}</td>
    <td>
      <input
        type="button"
        value="Email"
        className={styles.btn}
        onClick={() => {
          window.location.href =
            "/email?Winner=" +
            props.gamelog.winner +
            "&PlayerX=" +
            props.gamelog.playerX +
            "&PlayerO=" +
            props.gamelog.playerO;
        }}
      />
    </td>
  </tr>
);

const GamelogsList = (props) => {
  const [gamelogs, setGamelogs] = useState([]);

  useEffect(() => {
    axios
      .get("/api/gamelog/")
      .then((response) => {
        setGamelogs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={`${shared["shared-container"]} ${styles.gamelogs}`}>
      <h1 className={styles.heading}>Game Logs</h1>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <th>Playtime(s)</th>
          <th>Winner</th>
          <th>Loser</th>
          <th>X</th>
          <th>O</th>
          <th>Date played</th>
          <th></th>
        </thead>
        <tbody className={styles.tbody}>
          {gamelogs.map((currentgamelog) => {
            return (
              <Gamelog gamelog={currentgamelog} key={currentgamelog._id} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GamelogsList;
