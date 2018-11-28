import BasicEntity from './BasicEntity';

export default class extends BasicEntity {
  constructor(props) {
    super(props);
    this.dx = props.dx;
    this.dy = props.dy;
    this.radius = props.radius;
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
}