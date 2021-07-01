export function Enemy(enemy) {
  this.type = enemy.type;
  this.hp = 1;
  this.range = 0;
  this.speed = 1;
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
