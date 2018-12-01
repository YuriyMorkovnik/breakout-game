import BasicEntity from './BasicEntity';

export default class extends BasicEntity {
  constructor(props) {
    super(props);
    this.dx = props.dx;
  }
  moveLeft() {
    this.x -= this.dx;
  }
  moveRight() {
    this.x += this.dx;
  }
  render() {
    const { ctx, height, width, x, color, canvas } = this;
    ctx.beginPath();
    ctx.rect(x, canvas.height-height, width, height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }
}