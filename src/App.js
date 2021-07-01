import './App.css';
import { Weapon, items } from './classes/Weapon';
import { Board } from './classes/Board';
import { GameBoard } from './components/board';
import NewPlayer from './components/newPlayer';
import React, { useState, useEffect} from 'react';
import { Player } from './classes/Player';
// import { Tile } from './classes/Tile';

function App() {

  let board1 = new Board();
  board1.buildBoard();
  const [board, setBoard] = useState(board1);
  let weapon1 = new Weapon(items[0]);

  function deleteBoard() {
      setBoard(null);
  }


  function rebuildBoard(b) {
    let newBoard = new Board();
    newBoard.buildBoard();
    setBoard(newBoard);
  }

  function createPlayer(name) {
    let newPlayer = new Player(name);
    console.log(`created player:`,newPlayer);
    newPlayer.place(board.startingTile);
    setBoard(board);
    console.log(`set board with board:`,board);
  }

  return (

    <div className="App">
      <h1>Zombicide</h1>
      {board &&
          <GameBoard board={board} />
      }
      <NewPlayer createPlayer={createPlayer} />
    </div>
  );
}

export default App;
