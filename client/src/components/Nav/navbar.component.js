import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from "./navbar.module.css";

export default class Navbar extends Component {
  render() {
    return (
      <nav className={styles.navigation}>
        <Link to="/" className={styles.brand}>
          Tic-Tac-Toe
        </Link>
        <ul className={styles["nav-list"]}>
          <li className={styles["nav-item"]}>
            <Link to="/" className={styles["nav-link"]}>
              Game Logs
            </Link>
          </li>
          <li className={styles["nav-item"]}>
            <Link to="/settings" className={styles["nav-link"]}>
              Game
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
