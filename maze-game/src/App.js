import React, { Component } from 'react';
import player from './player.jpg'
import food from './food.jpg'
import './App.css';


let inputedRows;
let inputedColumns;
let rows = [];
let columns = [];
let customBoard = [];
let playerPosition;
let foodPosition = [];
let move;
let position;
let boardWidth, boardHeight;


function Box({id}) {
  return (
    <div className='box' id={id}>
      <img
        src={player}
        className='player'
        style={{ display: 'none', left: 0, top: 0 }}
        id={`player-${id}`}
      />
      <img
        src={food}
        className='food'
        style={{display: 'none'}}
        id={`food-${id}`}
      />
    </div>
  );
}

class GameBoard extends Component {

  // state = {}

  createGameBoard = () => {
    inputedRows = prompt('Please enter board height', 10);
    inputedColumns = prompt('Please enter board width', 10);

    if (inputedRows < 2 || isNaN(inputedRows)) {
      inputedRows = prompt(`Either number is not greater than 1 or it's not a number`);
    }

    if (inputedColumns < 2 || isNaN(inputedColumns)) {
      inputedColumns = prompt(`Either number is not greater than 1 or it's not a number`);
    }

    for(let i = 0; i < inputedRows; i++) {
      let boardRow = [];
        for(let j = 0; j < inputedColumns; j++) {
          boardRow.push(
            <Box 
              key={`${i}_${j}`}
              id={`${i}_${j}`}
            />
          )
          rows.push(i);
          columns.push(j);
        }
        customBoard.push(<div className="board-row">{boardRow}</div>);
    }
    return customBoard;
  }

  render() {
    return (
      <div>{this.createGameBoard()}</div>
    );
  }
}

class Game extends Component {

  componentDidMount() {
    
    playerPosition = this.generateCoordinates(rows, columns)
   
    document.getElementById(`player-${playerPosition}`).style.display = "inline";
    
    for (let i = 0; i < inputedRows*inputedColumns; i++) {
      position = this.generateCoordinates(rows, columns)
      foodPosition.indexOf(position) === -1 && position !== playerPosition ? foodPosition.push(position) : null
    }
    
    let selectedfoodPosition = foodPosition.slice(0, inputedRows)
    
    
    for (let i = 0; i < selectedfoodPosition.length; i++) {
      position = selectedfoodPosition[i]
      document.getElementById(`food-${position}`).style.display = "inline";
    }
    
    
    boardWidth = inputedRows * 50
    boardHeight = inputedColumns * 50

    
    document.addEventListener('keyup', (e) => {
      const allowedKeys = {
          37: "left",
          38: "up",
          39: "right",
          40: "down"
      };
      this.handlePlayer(allowedKeys[e.keyCode])
    })
  }

  generateCoordinates(rowArray, columnArray) {
    let rowCoord = rowArray[Math.floor(Math.random()*rowArray.length)]
    let columnCoord = columnArray[Math.floor(Math.random()*columnArray.length)]
    return(`${rowCoord}_${columnCoord}`)
  }

  handlePlayer(allowedKeys) {
    switch (allowedKeys) {
      case "left": 
        document.getElementById(`player-${playerPosition}`).style.left = -25;
        break
      case "right": 
        document.getElementById(`player-${playerPosition}`).style.left = +25;
        break
      case "up": 
        document.getElementById(`player-${playerPosition}`).style.top = +25;
        break
      case "down": 
        document.getElementById(`player-${playerPosition}`).style.top = +25;
        break
    }
  }


  render() {
    return (
      <div className="App">
        <GameBoard />
      </div>
    );
  }
}

export default Game;
