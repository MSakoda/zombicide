import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Weapon, items } from './classes/Weapon';
import { Board } from './classes/Board';
import { GameBoard } from './components/board';
import { Actions } from './components/actions';
import NewPlayer from './components/newPlayer';
import React, { useState} from 'react';
import { Player } from './classes/Player';
import { Enemy } from './classes/Enemy';
// import { Tile } from './classes/Tile';

function App() {

  let board1 = new Board();
  board1.buildBoard();
  const [board, setBoard] = useState(board1);

  const [players, setPlayers] = useState([]);

  const [phase, setPhase] = useState('player');


  function updatePhase() {
    let newPhase = '';
    switch(phase) {
      case 'player':
        newPhase = 'zombie';
        break;
      case 'zombie':
        newPhase = 'spawn';
        break;
      default:
        newPhase = 'player';
    }
    setPhase(newPhase);
    console.log(`phase is now:`,phase);
  }

  function handleEndTurn(player,idx) {
      console.log(`handling end turn with idx: ${idx}`);
      // switch this players' active to false, and set next player's active to true
      // if current active player is last in players array, set phase to zombie phase
      if (idx === players.length - 1) {
        console.log(`last player in players array, go to next phase`);
        updatePhase();
      } else {
          // move active to next player
          player.active = false;
          players[idx+1].active = true;
          let updatedPlayers = [...players];
          setPlayers(updatedPlayers);
      }
  }

  function handleCreatePlayer(name) {
    // create player
    let newPlayer = new Player(name);
    console.log(`created player:`,newPlayer);

    // put player on board
    newPlayer.place(board.startingTile);

    // set to active if first player
    if (players.length === 0) {
      newPlayer.active = true;
    }

    // create copy of players
    let updatedPlayers = [...players];
    // add player to players array
    updatedPlayers.push(newPlayer);
    // update players state
    setPlayers(updatedPlayers);

    // create copy of board
    let updatedBoard = {...board};
    // update state with board copy
    setBoard(updatedBoard);
  }

  function createEnemy() {
    let random = Math.floor(Math.random() * 4);
    let type = '';
    switch(random) {
      case 1:
        type = 'fatty';
        break;
      case 2:
        type = 'runner';
        break;
      case 3:
        type = 'abom';
        break;
      default:
        type = 'walker';
    }
    let randRow = Math.floor(Math.random() * 4);
    let randCol = Math.floor(Math.random() * 4);
    let randTile = board.getTile(randRow,randCol);
    let newEnemy = new Enemy({type:type, tile: randTile})
    console.log(`newEnemy:`,newEnemy);
    randTile.enemies.push(newEnemy);
    let updatedBoard = {...board};
    setBoard(updatedBoard);
  }

  return (

    <div className="App">
      <h1>Zombicide</h1>
      <h5 style={{textTransform:'capitalize'}}>{phase} Phase</h5>
      <div className="container">
        <div className="row">
          <div className="col-md-9">
          {board &&
            <GameBoard board={board} />
          }
          </div>
          <div className="col-md-3">
            <Actions
                phase={phase}
                handleEndTurn={handleEndTurn}
                players={players} />
          </div>
        </div>
      </div>
      <NewPlayer handleCreatePlayer={handleCreatePlayer} />
      <button onClick={() => createEnemy()}>New Enemy</button>
      <button onClick={() => updatePhase()}>Next Phase</button>
    </div>
  );
}

export default App;
