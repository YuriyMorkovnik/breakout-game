import BasicEntity from './BasicEntity';

export default class extends BasicEntity {
  constructor(props) {
    super(props);
    this.key = props.key;
    this.padding = props.padding;
  }
  render() {
    const { ctx, x, y, width, height, color } = this;
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath()
  }
}
