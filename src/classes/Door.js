import { Weapon } from './Weapon';

export function Door() {
  this.isOpen = false;

  this.openDoor = () => {
    this.isOpen = true;
  }

  this.attemptToOpen = (weapon) => {
    if (!(weapon instanceof Weapon)) {
      console.log(`a weapon is required to open the door`);
      return;
    }

    if (weapon.doorOpen > 0) {
      // roll die
      let num = Math.floor(Math.random() * 6) + 1;
      console.log("num:",num);
      if (num >= weapon.doorOpen) {
        this.openDoor();
        console.log(`opened door with ${weapon.name} by rolling ${num}`);
      } else {
        console.log(`failed to open door with ${weapon.name} by rolling ${num}`);
      }

    } else {
      console.log(`You don't have a valid weapon to open the door`);
    }
  }

}
