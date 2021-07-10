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
import { survivors } from './util';

function App() {
  console.log(`running App`);

  let board1 = new Board();
  board1.buildBoard();

  const [board, setBoard] = useState(board1);

  const [players, setPlayers] = useState(buildSurvivors());
  const [enemies, setEnemies] = useState([]);

  const [phase, setPhase] = useState('player');

  function buildSurvivors() {
      let _survivors = [];
      survivors.forEach((survivor,i) => {
        let newSurvivor = new Player(survivor.name);
        newSurvivor.place(board.startingTile);
        if (i === 0) {
            newSurvivor.active = true;
            newSurvivor.actions = newSurvivor.maxActions;
        }
        _survivors.push(newSurvivor)
      })
      console.log(`_survivors:`,_survivors);
      return _survivors;
      // setPlayers(updatedPlayers);
  }

  function updatePhase() {
    if (phase === 'player') {
      setPhase('zombie');
      handleZombiePhase();
    } else if (phase === 'zombie') {
      setPhase('spawn');
    } else if (phase === 'spawn') {
      setPhase('player');
      handlePlayerPhase();
    }
  }

  function handlePlayerPhase() {
    console.log(`handling player phase`);
    // set first player to active
    let player = players[0];
    player.active = true;
    player.actions = player.maxActions;

    let updatedPlayers = [...players];
    setPlayers(updatedPlayers);
  }

  function handleZombiePhase() {
    console.log(`zombie phase`);
    /* // TODO:
      1. check if zombies exist
      2. move them towards players
      3. attack players if they are on same tile as player
    */
    // check if zombies exist
    if (enemies.length > 0) {
      console.log(`enemies:`,enemies);
    }
  }

  function handleEndTurn(player,idx) {
      console.log(`handling end turn with idx: ${idx}`);
      // switch this players' active to false, and set next player's active to true
      // if current active player is last in players array, set phase to zombie phase
      if (idx === players.length - 1) {
        console.log(`last player in players array, go to next phase`);
        player.active = false;
        let updatedPlayers = [...players];
        setPlayers(updatedPlayers);
        updatePhase();
      } else {
          // move active to next player
          player.active = false;
          players[idx+1].active = true;
          let updatedPlayers = [...players];
          setPlayers(updatedPlayers);
      }
  }

  function handleMove(player, direction, callback) {
    console.log("running handleMove with player:",player,"and direction:",direction);
    // try to move player
    console.log(`board:`,board);
    // console.log(`board instanceof Board:`,(board instanceof Board));
    player.move(board, direction.direction.toLowerCase());
    console.log(`player after move:`,player);
    setPlayers([...players]);
    setBoard({...board});
    callback();
  }

  function handleSearch(player, callback) {
    console.log(`running handleSearch with player:`,player);
    // get tile
    let playerTile = board.getTile(player.position.row, player.position.col);
    player.search(playerTile);

    setPlayers([...players]);
    callback();
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
      newPlayer.actions = newPlayer.maxActions;
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

    // create copy of enemies
    let updatedEnemy = [...enemies];
    // add player to enemies array
    updatedEnemy.push(newEnemy);
    // update enemies state
    setEnemies(updatedEnemy);

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
                board={board}
                handleEndTurn={handleEndTurn}
                handleSearch={handleSearch}
                handleMove={handleMove}
                players={players} />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <button disabled={players.length === 0} className="btn btn-primary offset-3 col-3" onClick={() => updatePhase()}>Next Phase</button>
        </div>
      </div>
    </div>
  );
}

export default App;
