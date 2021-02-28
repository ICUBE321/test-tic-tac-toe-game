import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import "./game.css";
import axios from 'axios';
import Image from "react-bootstrap/Image"

  function Square(props) {

    return (
      <button className="square" 
              onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {

    renderSquare(i) {
      return <Square value={this.props.squares[i]}
                      onClick={() => this.props.onClick(i)} />;
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  export default class Game extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        history: [{
          squares: Array(9).fill(null)
        }],
        xIsNext: true,
        stepNumber: 0,
        id: null,
        playtime: 0,
        winner: "",
        loser: "",
        time: 0,
        start: 0,
        playerX: '',
        playerO: '',
        imageURL1: '',
        imageURL2: ''
      }

      this.getFromSearch = this.getFromSearch.bind(this);
      this.startTimer = this.startTimer.bind(this);
      this.stopTimer = this.stopTimer.bind(this);
      this.resetTimer = this.resetTimer.bind(this);
    }

    componentDidMount() {
      this.getFromSearch();
      this.startTimer();
    }

    getFromSearch() {
      const urlParams = new URLSearchParams(window.location.search);
      const playerX = urlParams.get('PlayerX');
      const playerO = urlParams.get('PlayerO');
      const URL1 = urlParams.get('URL1');
      const URL2 = urlParams.get('URL2');

      this.setState({
        playerX: playerX,
        playerO: playerO,
        imageURL1: URL1,
        imageURL2: URL2
      })

      console.log('Player X username from url: ' + playerX);
      console.log('Player O username from url: ' + playerO);
      console.log('Player X username from state: ' + this.state.playerX);
      console.log('Player O username from state: ' + this.state.playerO);
    }

    startTimer() {
      this.setState({
      //   isOn: true,
        time: this.state.time,
        start: Date.now()
       })
      this.timer = setInterval(() => this.setState({
        time: this.state.time + 1
      }), 1000);
      console.log("timer started");
    }

    stopTimer() {
      console.log("timer stopped");
      // this.setState({isOn: false})
      clearInterval(this.timer)
    }

    resetTimer() {
      this.setState({time: 0})
      console.log("reset")
    }

    onSaveGamelog(winnerTag, loserTag, playtime) {

      const gamelog = {
        playtime: playtime,
        winner: winnerTag,
        loser: loserTag,
        date: new Date(),
        playerX: this.state.playerX,
        playerO: this.state.playerO,
      };

      console.log(gamelog);

      axios.post('/api/gamelog/add', gamelog)
        .then(res => console.log(res.data));

      if(window.confirm("Send game score to email address?")) {
        console.log("Sending to email...");
        window.location.href = "/email?Winner="+gamelog.winner+"&PlayerX="+gamelog.playerX+"&PlayerO="+gamelog.playerO;
      } else {
        console.log("Not sending to email...");
        window.location = '/';
      }
    }

    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      const winner = current.winner;
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({history: history.concat([{
                        squares: squares,
                      }]), 
                      stepNumber: history.length,
                      xIsNext: !this.state.xIsNext,
                      winner: winner,
                      timestamp: new Date()}
                      );
    }

    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }

    render() {
      const playerXName = this.state.playerX;
      const playerOName = this.state.playerO;
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);

      const moves =  history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });

      let status;
      if (winner) {

        this.stopTimer();
        status = 'Winner: ' + winner; 
        const loser = winner ==='O' ? 'X' : 'O';
        const playtime = this.state.time;
        this.state.time = 0
        this.onSaveGamelog(winner, loser, playtime);

      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
          <br/>
          <div>
            <p>PLAYER X: {playerXName} VS PLAYER O: {playerOName} </p>
            <p><Image src={this.state.imageURL1} thumbnail width="171"/> VS <Image src={this.state.imageURL2} thumbnail width="171"/></p>
          </div>
        </div>
      );
    }
  }

  

  function calculateWinner(squares) {
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
  // ========================================
  
  // ReactDOM.render(
  //   <Game />,
  //   document.getElementById('root')
  // );
  