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
}