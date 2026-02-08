import Component from '../../core/Component';
import { store } from '../../store/Store';
import Message from '../message/Message';
import './style.css';

class DialogField extends Component {
  private readonly message: Message;
  constructor() {
    super('div', 'dialog-field');
    this.message = new Message();
    this.mounted();
  }

  private showMessage() {
    const messageHTML = this.message.render();
    this.element.append(messageHTML);
  }

  private mounted() {
    store.subscribe(() => {
      this.showMessage();
    });
  }

  render() {
    this.element.textContent = 'Select a user to send the message...';
    this.element.classList.add('dialog-placeholder');
    return this.element;
  }
}

export default DialogField;
