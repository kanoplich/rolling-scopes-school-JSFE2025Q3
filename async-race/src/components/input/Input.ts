import Component from '../../core/Component';
import './style.css';

class Input extends Component {
  constructor(type: string, id: string) {
    super('input', 'input');

    this.element.setAttribute('type', type);
    this.element.setAttribute('id', id);
  }

  setAttribute(attribute: string, value: string) {
    this.element.setAttribute(attribute, value);
  }

  render() {
    return this.element;
  }
}

export default Input;
