import axios from "axios";
import React, { Component } from "react";

export default class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playerX: '',
            playerO: '',
            players: [],
            imageUrl1: '',
            imageUrl2: '',
        }

        this.onChangePlayerX = this.onChangePlayerX.bind(this);
        this.onChangePlayerO = this.onChangePlayerO.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getRandomImage = this.getRandomImage.bind(this);
    }

    componentDidMount() {
        axios.get('/api/player/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        players: response.data.map(player => player.username),
                        username: response.data[0].username
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    getRandomImage(playerNumber) {
        axios.get('https://secret-ocean-49799.herokuapp.com/http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true')
            .then(response => {
                console.log(response);
                if(playerNumber === 1) {
                    this.setState({ imageUrl1: response.data[0] });
                    console.log("Image url for player 1: "+this.state.imageUrl1);
                } else if(playerNumber === 2) {
                    this.setState({ imageUrl2: response.data[0] });
                    console.log("Image url for player 2: "+this.state.imageUrl2);
                }
            })
    }

    onChangePlayerX(e) {
        this.setState({
            playerX: e.target.value
        });
    }

    onChangePlayerO(e) {
        this.setState({
            playerO: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const playerX = {
            username: this.state.playerX,
        };
        const playerO = {
            username: this.state.playerO,
        };

        if((playerX.username.trim().length < 3 || playerX.username === null) || (playerO.username.trim().length < 3 || playerO.username === null)) {
            alert("Enter player names!");
        } else {
            
            if(!this.state.players.includes(playerX.username)) {
                axios.post('/api/player/add', playerX)
                    .then(res => console.log(res.data))
                    .catch(error => {
                        console.log("Error while adding player: "+error)
                    });
            }
    
            if(!this.state.players.includes(playerO.username)) {
                axios.post('/api/player/add', playerO)
                    .then(res => console.log(res.data))
                    .catch(error => {
                        console.log("Error while adding player: "+error)
                    });;
            }

            console.log("Player X: " + playerX.username);
            console.log("Player O: " + playerO.username);
            window.location.href = "/game?PlayerX="+playerX.username+"&PlayerO="+playerO.username;
        }
    }

    render() {
        return (
            <div>
                <h3>Select Player Tags</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Player X: </label>
                        <input type="text"
                            list="usernames1" 
                            className="form-control"
                            value={this.state.playerX}
                            onChange={this.onChangePlayerX} />

                        <datalist id="usernames1">
                            {
                                this.state.players.map(function(player1) {
                                    return <option
                                        key={player1}>
                                            {player1}
                                    </option>;
                                })
                            }
                        </datalist>

                        <input type="button" value="Random Icon" onClick={() => this.getRandomImage(1)}/>
                        <img src={this.state.imageUrl1} alt=""/><br/>
                    </div>
                    <div className="form-group">
                        <label>Player O: </label>
                        <input type="text"
                            list="usernames2" 
                            className="form-control"
                            value={this.state.playerO}
                            onChange={this.onChangePlayerO} />

                        <datalist id="usernames2">
                            {
                                this.state.players.map(function(player2) {
                                    return <option
                                        key={player2}>
                                            {player2}
                                    </option>;
                                })
                            }
                        </datalist>
                        <input type="button" value="Random Icon" onClick={() => this.getRandomImage(2)}/>
                        <img src={this.state.imageUrl2} alt=""/><br/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Start Game" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}