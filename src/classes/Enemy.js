export function Enemy(enemy) {
  console.log(`creating enemy with enemyobj:`,enemy);
  this.type = enemy.type;
  this.hp = 1;
  this.range = 0;
  this.speed = 1;
  this.position = {
    row: 0,
    col: 0
  }
  if (enemy.tile) {
    this.position.row = enemy.tile.position.row;
    this.position.col = enemy.tile.position.col;
  }
  if (enemy.type === 'runner') {
    this.speed = 2;
  }
  if (enemy.type === 'fatty') {
    this.hp = 2;
  }
  if (enemy.type === 'abom') {
    this.hp = 3;
  }

}
