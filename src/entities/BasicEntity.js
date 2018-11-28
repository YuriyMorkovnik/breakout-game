export default class {
  constructor({ x, y, width, height, color }) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
  }
  get getX() {
    return this.x;
  }
  setX(newX) {
    this.x = newX;
  }
  setY(newY) {
    this.y = newY;
  }
}
