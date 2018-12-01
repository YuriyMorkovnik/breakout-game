import BasicEntity from './BasicEntity';

export default class extends BasicEntity {
  constructor(props) {
    super(props);
    this.dx = props.dx;
    this.dy = props.dy;
    this.radius = props.radius;
  }
  get getNextPosition() {
    return {
      x: this.x + this.dx + (this.dx > 0 ? this.radius : -this.radius),
      y: this.y + this.dy + (this.dy > 0 ? this.radius : -this.radius),
    }
  }
  reverseX() {
    this.dx = -this.dx;
  }
  reverseY() {
    this.dy = -this.dy;
  }
  push() {
    this.y += this.dy;
    this.x += this.dx;
  }
  render() {
    const { ctx, x, y, radius, color } = this;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }
}