import BasicEntity from './BasicEntity';

export default class extends BasicEntity {
  constructor(props) {
    super(props);
    this.key = props.key;
    this.padding = props.padding;
  }
}
