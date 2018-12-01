export default class {
  constructor({ x, y, width, height, color = '#0095DD' }) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.canvas = document.getElementById('myCanvas');
    this.ctx = this.canvas.getContext('2d');
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
