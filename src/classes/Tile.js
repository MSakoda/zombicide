

export function Tile(tile) {
  this.enemies = [];
  this.players = [];
  this.position = {
    row: tile.position.row,
    col: tile.position.col
  }
  this.type = tile.type;
  this.typeChar = tile.typeChar;

  this.showTile = () => {
    console.log(`position: ${this.position.row}, ${this.position.col}`);
    console.log(`type: ${this.type}`);
    if (this.players.length === 0 && this.enemies.length === 0) {
      console.log(`tile is empty.`);
    } else {
      if (this.players.length > 0) {
        let players = this.players.map(p => p.name);
        console.log(`Players in tile:`, players.join(", "));
      }

      if (this.enemies.length > 0) {
        let enemies = {};
        this.enemies.forEach(e => {
          if (enemies[e.type] === undefined) {
            enemies[e.type] = 1;
          } else {
            enemies[e.type] += 1;
          }
        });
        let enemyStr = `Enemies in tile:`;
        let enemyArr = [];
        for (let type in enemies) {
          enemyArr.push(`${type} - ${enemies[type]}`);
        }
        enemyStr = `${enemyStr} ${enemyArr.join(", ")}.`;
        console.log(enemyStr);
      }
    }

  }
}
