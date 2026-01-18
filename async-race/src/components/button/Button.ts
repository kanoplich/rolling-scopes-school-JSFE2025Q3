import Component from '../../core/Component';
import './style.css';

class Button extends Component {
  constructor(id: string, text: string = '') {
    super('button', 'btn');
    this.element.setAttribute('id', id);
    this.element.textContent = text;
  }

  render() {
    return this.element;
  }
}

export default Button;
