export function Weapon(weapon) {
  this.name = weapon.name;
  this.damage = weapon.damage;
  this.hit = weapon.hit;
  this.hits = weapon.hits;
  this.doorOpen = weapon.doorOpen;
  this.doorNoise = weapon.doorNoise;
  this.attackNoise = weapon.attackNoise;
  this.maxRange = weapon.maxRange;
  this.minRange = weapon.minRange
}

export const items = [
  {
    type: 'weapon',
    name: 'hammer',
    damage: 2,
    hit: 4,
    hits: 1,
    doorOpen: 4,
    doorNoise: true,
    attackNoise: false,
    minRange: 0,
    maxRange: 0
  },
  {
    type: 'weapon',
    name: 'axe',
    damage: 1,
    hit: 4,
    hits: 1,
    doorOpen: 1,
    doorNoise: true,
    attackNoise: false,
    minRange: 0,
    maxRange: 0
  },
  {
    type: 'weapon',
    name: 'dagger',
    damage: 1,
    hit: 4,
    hits: 1,
    doorOpen: 4,
    doorNoise: true,
    attackNoise: false,
    minRange: 0,
    maxRange: 0
  },
  {
    type: 'weapon',
    name: 'sword',
    damage: 1,
    hit: 4,
    hits: 2,
    doorOpen: 4,
    doorNoise: true,
    attackNoise: false,
    minRange: 0,
    maxRange: 0
  },
]
