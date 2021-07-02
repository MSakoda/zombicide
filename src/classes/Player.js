import { Board } from './Board';
import { Tile } from './Tile';
import { Door } from './Door';
import { Enemy } from './Enemy';
import { Weapon, items } from './Weapon';
import { directions } from '../util';

export function Player(name) {
  this.name = name;
  this.weapons = [];
  this.armor = [];
  this.position = {
    row: 0,
    col: 0
  }
  this.active = false;

  // place Player on tile
  this.place = tile => {
    tile.players.push(this);
    this.position = tile.position;
  }

  this.greeting = () => {
    console.log(`Greetings. I am ${name}`);
  }

  this.move = (board, direction) => {
    // invalid inputs
    if (!(board instanceof Board)) {
      console.log(`A board is needed to move the player.`);
      return;
    }
    if (board.tiles.length === 0) {
      console.log(`Board needs to be built`);
      return;
    }

    // check if tile is valid
    let nextTileRow = this.position.row + directions[direction][0];
    let nextTileCol = this.position.col + directions[direction][1];

    if (nextTileRow < 0 || nextTileCol < 0 || !(board.tiles[nextTileRow][nextTileCol] instanceof Tile)) {
      console.log(`Not a valid Tile, outside of bounds with row:${nextTileRow} and col:${nextTileCol}`);
      return;
    }

    // Find current tile
    let currTile = board.getTile(this.position.row, this.position.col);
    // remove player from current tile
    let playerIdx = currTile.players.findIndex(p => {
      if (p.name === this.name) {
        return true;
      }
      return false;
    });
    currTile.players = [...currTile.players.slice(0,playerIdx), ...currTile.players.slice(playerIdx + 1)];

    // find tile and put player into it
    let tile = board.getTile(nextTileRow,nextTileCol);
    tile.players.push(this);

    // update player position
    this.position.row = nextTileRow;
    this.position.col = nextTileCol;
  }

  this.search = (tile) => {
    // invalid input
    if (!(tile instanceof Tile)) {
      console.log(`must search on valid tile`);
      return;
    }

    if (tile === 'room') {
      // get random item
      let item = items[Math.floor(Math.random() * items.length)];
      if (item.type === 'weapon') {
        let weapon = new Weapon(item);
        this.weapons.push(weapon);
        console.log(`found ${weapon.name} and added to inventory`);
      }
    } else {
      console.log(`can not search if not in a room`);
    }
  }

  this.openDoor = (door, weapon) => {
    if (door === undefined) {
      console.log(`You need a door to open.`);
      return;
    }
    if (weapon === undefined) {
      console.log(`You need a weapon to open a door.`);
      return;
    }
    if (door instanceof Door === true) {
      door.attemptToOpen(weapon);
    } else {
      console.log(`error trying to open `,door);
    }
  }

  this.attackEnemy = (enemy, weapon) => {
    if (!(enemy instanceof Enemy) || !(weapon instanceof Weapon)) {
      console.log(`can not complete attack enemy.  either enemy or weapon is invalid`);
      return;
    }



  }
}
