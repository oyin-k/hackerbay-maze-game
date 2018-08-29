import React, { Component } from 'react';
import './App.css';

let rows = [];
let columns = [];
let customBoard = [];

function Box({id}) {
  return (
    <div className='box' id={id}></div>
  );
}

class GameBoard extends Component {

  // state = {}

  createGameBoard = () => {
    let inputedRows = prompt('Please enter board height', 10);
    let inputedColumns = prompt('Please enter board width', 10);

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

class App extends Component {
  render() {
    return (
      <div className="App">
        <GameBoard />
      </div>
    );
  }
}

export default App;
