import Component from '../../core/Component';
import './style.css';

class DialogForm extends Component {
  constructor() {
    super('form', 'dialog-form');
  }

  private createForm() {
    this.element.innerHTML = '';

    const input = this.createElement('input', 'dialog-input');
    input.setAttribute('type', 'text');
    input.setAttribute('name', 'dialog-input');
    input.setAttribute('placeholder', 'Your message...');
    const button = this.createElement('button', 'dialog-button', 'Send it');
    button.setAttribute('type', 'submit');

    input.addEventListener('input', (event) => this.handleInput(event));
    button.addEventListener('click', (event) => this.handleClick(event));

    this.element.append(input, button);
  }

  private handleInput(event: Event) {
    event.preventDefault();
    console.log(event.target);
  }

  private handleClick(event: Event) {
    event.preventDefault();
    console.log('click');
  }

  render() {
    this.createForm();
    return this.element;
  }
}

export default DialogForm;
