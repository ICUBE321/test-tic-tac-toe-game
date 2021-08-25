import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navbar from "./components/Nav/navbar.component";
import GamelogsList from "./components/GameSetup/gamelogs-list.component";
import PlayerForm from "./components/GameSetup/PlayerForm";
import Game from "./components/Gameplay/game.component";
import Email from "./components/email.component";

//always show navbar on each component page
//each component route path defined
function App() {
  return (
    <Router>
      <div className="main">
        <Navbar />
        <Route path="/" exact component={GamelogsList} />
        <Route path="/settings" exact component={PlayerForm} />
        <Route path="/game" exact component={Game} />
        <Route path="/email" exact component={Email} />
      </div>
    </Router>
  );
}

export default App;
