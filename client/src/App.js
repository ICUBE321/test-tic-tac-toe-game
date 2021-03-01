import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component"
import GamelogsList from "./components/gamelogs-list.component";
import Settings from "./components/settings.component";
import Game from "./components/game.component";
import Email from "./components/email.component";

//always show navbar on each component page
//each component route path defined
function App () {
        return (
            <Router>
                <div className="container">
                    <Navbar />
                    <br/>
                    <Route path="/" exact component={GamelogsList} />
                    <Route path="/settings" exact component={Settings}/>
                    <Route path="/game" exact component={Game}/>
                    <Route path="/email" exact component={Email}/>
                </div>
            </Router>
        );
} 

export default App;