import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Weapon, items } from './classes/Weapon';
import { Board } from './classes/Board';
import { GameBoard } from './components/board';
import { Gamelog } from './components/gamelog';
import { Actions } from './components/actions';
import NewPlayer from './components/newPlayer';
import React, { useState} from 'react';
import { Player } from './classes/Player';
import { Enemy } from './classes/Enemy';
// import { Tile } from './classes/Tile';
import { survivors } from './util';

function App() {
  console.log(`running App!!!`);

  let board1 = new Board();
  board1.buildBoard();

  const [logs, setLogs] = useState(() => []);
  const [board, setBoard] = useState(board1);

  const [players, setPlayers] = useState(() => {
      return buildSurvivors();
  })
  const [enemies, setEnemies] = useState(() => []);

  const [phase, setPhase] = useState(() => {
      return 'player';
  });

  function addLog(log){
    let date = new Date();
    console.log(`date:`,date);
    let updatedLog = `${date.toLocaleTimeString()} - ${log}`;
    setLogs(prevLogs => {
      return [...prevLogs,updatedLog];
    })
  }

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
      if (enemies.length > 0) {
        addLog("Phase is now Zombie Phase");
        handleZombiePhase();
      } else {
        addLog('Phase is now Spawn Phase');
        handleSpawnPhase();
      }
    } else if (phase === 'zombie') {
      addLog("Phase is now Spawn Phase");
      handleSpawnPhase();
    } else if (phase === 'spawn') {
      setPhase('player');
      addLog("Phase is now Player Phase");
      handlePlayerPhase();
    }
  }

  function deactivatePlayers(){
      players.forEach(player => {
          player.active = false;
          player.actions = 0;
      })
      setPlayers(prevPlayers => [...prevPlayers]);
  }

  function handleSpawnPhase() {
      console.log(`handling spawn phase`);
      deactivatePlayers();
      // create an enemy for each spawn tile
      // get the spawn tiles
      board.spawnTiles.forEach(spawnTile => {
          console.log(`spawnTile:`,spawnTile);
          let enemy = createEnemy(spawnTile);
      });
      addLog("Spawned enemies.  Phase is now Player Phase");
      setPhase('player');
      handlePlayerPhase();


  }

  function handlePlayerPhase() {
    console.log(`handling player phase`);
    // set first player to active
    let player = players[0];
    player.active = true;
    player.actions = player.maxActions;
    setPlayers(prevPlayers => {
        return [...prevPlayers];
    });
  }

  function handleZombiePhase() {
      deactivatePlayers();
    console.log(`zombie phase`);
    /* // TODO:
      1. check if zombies exist
      2. move them towards players
      3. attack players if they are on same tile as player
    */
    // check if zombies exist
    if (enemies.length > 0) {
      console.log(`enemies:`,enemies);
    } else {
      console.log(`update to spawn phase`);
      updatePhase();
    }
  }

  function handleEndTurn(player,idx) {
      console.log(`handling end turn with idx: ${idx}`);
      // switch this players' active to false, and set next player's active to true
      // if current active player is last in players array, set phase to zombie phase
      if (idx === players.length - 1) {
        console.log(`last player in players array, go to next phase`);
        player.active = false;
        setPlayers(prevPlayers => [...prevPlayers]);
        updatePhase();
      } else {
          // move active to next player
          player.active = false;
          players[idx+1].active = true;
          // update player's actions
          players[idx+1].actions = players[idx+1].maxActions;
          setPlayers(prevPlayers => [...prevPlayers]);
      }
  }

  function handleMove(player, direction, callback) {
    console.log("running handleMove with player:",player,"and direction:",direction);
    // try to move player
    console.log(`board:`,board);
    // console.log(`board instanceof Board:`,(board instanceof Board));
    player.move(board, direction.direction.toLowerCase());
    console.log(`player after move:`,player);
    setPlayers(prevPlayers => [...prevPlayers]);
    setBoard(prevBoard => {
        return {...prevBoard};
    });
    addLog(`${player.name} moved.`);
    callback();
  }

  function handleSearch(player, callback) {
    console.log(`running handleSearch with player:`,player);
    // get tile
    let playerTile = board.getTile(player.position.row, player.position.col);
    player.search(playerTile,log => {
        console.log("search callback log:",log);
        addLog(log);
    });

    // addLog(`${player.name} searched.`);
    setPlayers(prevPlayers => [...prevPlayers]);
    callback();
  }

  function handleKillEnemy(enemy){
      console.log("running handleKillEnemey with enemy:",enemy);
  }

  function handleAttackTile(player, weapon, callback){
    console.log("running handleAttackTile with player:",player,"weapon:",weapon);
    // get player's tile
    let tile = board.getTile(player.position.row,player.position.col);

    if (tile.enemies.length > 0) {
        // look for walkers
        let walkers = tile.enemies.filter(enemy => {
            return enemy.type === 'walker';
        });
        if (walkers.length > 0) {
            console.log("attacking walker");
            handleKillEnemy(walkers[0],data => {
                console.log("finished killing walker")
            })
        } else {
            let fatties = tile.enemies.filter(enemy => {
                return enemy.type === 'fatty';
            })

            if (fatties.length > 0) {
                console.log("attacking fatty");
                if (weapon.damage > 1) {
                    handleKillEnemy(fatties[0],data => {
                        console.log('finished killing zombie')
                    });
                } else {
                    addLog("Can not kill fatty with current weapon.  Must have at least 2 damage");
                }
            } else {
                let aboms = tile.enemies.filter(enemy => {
                    return enemy.type === "abom";
                })

                if (aboms.length > 0) {
                    console.log("attacking abomonation");
                } else {
                    console.log("what are we attacking?:",tile.enemies);
                }
            }
        }
    } else {
        console.log("No enemies to attack in tile.")
    }
    callback("complete");
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
    setPlayers(prevPlayers => [...updatedPlayers]);

    // create copy of board
    // update state with board copy
    setBoard(prevBoard => {
        return {...prevBoard};
    });
  }

  function createEnemy(tile) {
    let random = Math.floor(Math.random() * 100);
    let type = 'walker';
    if (random <= 5) {
        type = 'abom';
    } else if (random > 5 && random <= 25 ) {
        type = 'fatty';
    } else if (random > 25 && random <= 50) {
        type = 'runner';
    }

    let randRow = Math.floor(Math.random() * 4);
    let randCol = Math.floor(Math.random() * 4);
    let newEnemy = new Enemy({type:type, tile: tile})
    console.log(`newEnemy:`,newEnemy);
    tile.enemies.push(newEnemy);

    // update enemies state
    setEnemies(prevEnemies => {
        return [...prevEnemies,newEnemy];
    })

    setBoard(prevBoard => {
        return {...prevBoard};
    });
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
          <Gamelog logs={logs} />
          </div>
          <div className="col-md-3">
            <Actions
                phase={phase}
                board={board}
                handleEndTurn={handleEndTurn}
                handleSearch={handleSearch}
                handleAttackTile={handleAttackTile}
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
