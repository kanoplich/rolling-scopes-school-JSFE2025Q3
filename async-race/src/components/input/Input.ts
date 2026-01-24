import Component from '../../core/Component';
import './style.css';

class Input extends Component {
  constructor(type: string, id: string) {
    super('input', 'input');

    this.element.setAttribute('type', type);
    this.element.setAttribute('id', id);
  }

  setValue(value: string) {
    this.element.setAttribute('value', value);
  }

  render() {
    return this.element;
  }
}

export default Input;
