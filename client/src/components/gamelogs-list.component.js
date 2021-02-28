import React, { Component } from "react";
import axios from "axios";

const Gamelog = props => (
    <tr>
        <td>{props.gamelog.playtime}</td>
        <td>{props.gamelog.winner}</td>
        <td>{props.gamelog.loser}</td>
        <td>{props.gamelog.playerX}</td>
        <td>{props.gamelog.playerO}</td>
        <td>{props.gamelog.date}</td>
        <td><input type="button" value="Email" className="btn btn-primary" onClick={() => {
            window.location.href = "/email?Winner="+props.gamelog.winner+"&PlayerX="+props.gamelog.playerX+"&PlayerO="+props.gamelog.playerO;
        } 
            }/></td>
    </tr>
)

export default class GamelogsList extends Component {
    constructor(props) {
        super(props);

        this.state = {gamelogs: []};
    }

    componentDidMount() {
        axios.get('api/gamelog/')
            .then(response => {
                this.setState({ gamelogs: response.data });
            })
            .catch((error) => { 
                console.log("The problem is here!");
                console.log(error);
            })
    }

    gamelogList() {
        return this.state.gamelogs.map(currentgamelog => {
            return <Gamelog gamelog={currentgamelog} key={currentgamelog._id}/>;
        })
    }

    render() {
        return (
            <div>
                <h3>Game Logs</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Playtime in seconds</th>
                            <th>Winner</th>
                            <th>Loser</th>
                            <th>X</th>
                            <th>O</th>
                            <th>Date played</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.gamelogList() }
                    </tbody>
                </table>
            </div>
        )
    }
}