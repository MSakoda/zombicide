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
  this.actions = 0;
  this.maxActions = 3;
  this.health = 5;

  // place Player on tile
  this.place = tile => {
    tile.players.push(this);
    this.position = tile.position;
  }

  this.greeting = () => {
    console.log(`Greetings. I am ${name}`);
  }

  // Returns Bool determining if move is valid
  this.canMoveDirection = direction => {
    if (this.actions == 0) return false;
    let newRow = this.position.row + direction[0];
    let newCol = this.position.col + direction[1];
    if (newRow < 0 || newRow > 3 || newCol < 0 || newCol > 3) {
      return false;
    }
    return true;
  }

  // Returns Bool determinining if attack is valid
  this.canAttack = tile => {
    if (this.actions == 0) return false;
    // check if enemies in current tile
    if (tile.enemies.length > 0) {
      if (this.weapons.length > 0) {
        return true;
      } else {
        console.log(`no weapons, can't attack`);
      }
    }
    return false;
  }

  this.canSearch = tile => {
    if (this.actions == 0) return false;
    return tile.type === 'room';
  }

  this.attack = tile => {
    if (this.weapons.length == 0) {
      console.log(`Can not attack without a weapon`);
      return;
    }
    if (tile.enemies.length == 0) {
      console.log(`no enemies in tile to attack`);
      return;
    }
    // check weapon range
  }

  this.move = (board, direction) => {
    // invalid inputs
    // if (!(board instanceof Board)) {
    //   console.log(`A board is needed to move the player.`);
    //   return;
    // }
    if (board.tiles && board.tiles.length === 0) {
      console.log(`Board needs to be built`);
      return;
    }

    // check if tile is valid
    let nextTileRow = this.position.row + directions[direction][0];
    let nextTileCol = this.position.col + directions[direction][1];


    if (nextTileRow < 0 || nextTileCol < 0 || nextTileRow > 3 || nextTileCol > 3 || !(board.tiles[nextTileRow][nextTileCol] instanceof Tile)) {
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
    // update player actions
    this.actions -= 1;
    console.log(`player actions after move:`,this.actions);
  }

  this.search = (tile) => {
    // invalid input
    if (!(tile instanceof Tile)) {
      console.log(`must search on valid tile`);
      return;
    }

    if (tile.type === 'room') {
      // get random item
      let item = items[Math.floor(Math.random() * items.length)];
      if (item.type === 'weapon') {
        let weapon = new Weapon(item);
        this.weapons.push(weapon);
        console.log(`found ${weapon.name} and added to inventory`);
        this.actions -= 1;
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
