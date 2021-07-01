import './App.css';
import { Weapon, items } from './classes/Weapon';
import { Board } from './classes/Board';
import { GameBoard } from './components/board';
// import { Player } from './classes/Player';
// import { Tile } from './classes/Tile';

function App() {
  console.log("Zombicide");
  console.log(`items:`,items);
  let board = new Board();
  board.buildBoard();
  let weapon1 = new Weapon(items[0]);
  console.log(`weapon1:`,weapon1);
  function rebuildBoard(b) {
    console.log(`about to rebuild board`);
      b.buildBoard();
  }
  return (
    <div className="App">
      <h1>Zombicide</h1>
      <GameBoard board={board} />
    </div>
  );
}

export default App;
