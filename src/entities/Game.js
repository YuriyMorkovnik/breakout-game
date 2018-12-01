export default class Game {
  constructor() {
    if (Game.instance) {
      return Game.instance;
    }
    this.isPause = false;
  }
  switchState() {
    this.isPause = true;
  }
}
