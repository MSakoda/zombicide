import {Tile} from './Tile';

export function Board() {
  this.tiles = [];

  this.buildBoard = () => {
    console.log(`building board`);
    // clear board
    this.tiles = [];
    for (var i = 0; i < 4; i++) {
      let row = [];
      for (var j = 0; j < 4; j++) {
        let typeStr = Math.floor(Math.random() * 2) === 0 ? 'default' : 'room';
        let tile =  {
          type: typeStr,
          typeChar: typeStr === 'room' ? 'R' : 'D',
          position: {
            row: i,
            col: j
          }
        }
        let _tile = new Tile(tile);
        row.push(_tile);
      }
      this.tiles.push(row);
      this.showBoard();
    }
  }

  this.showBoard = () => {
    if (this.tiles.length === 0) {
      console.log(`board is empty. build board first.`);
      return;
    }
    for (var i = 0; i < this.tiles.length; i++) {
      let row = [];
      for (var j = 0; j < this.tiles[i].length; j++) {
        row.push(this.tiles[i][j].typeChar);
      }
      // print row with spaces
      console.log(row.join(" "));
    }
  }

  this.getTile = (row,col) => {
    if (row === undefined || col === undefined) {
      console.log(`row or col is undefined`);
      return;
    }
    return this.tiles[row][col];
  }
}
