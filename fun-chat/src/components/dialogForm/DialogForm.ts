import { send } from '../../api/websocket';
import Component from '../../core/Component';
import { store } from '../../store/Store';
import type { MessageSendRequest } from '../../types/webSocketType';
import './style.css';

class DialogForm extends Component {
  constructor() {
    super('form', 'dialog-form');
    this.createForm();
  }

  private createForm() {
    this.element.innerHTML = '';

    const input = this.createElement('textarea', 'dialog-input');
    input.setAttribute('name', 'dialog-input');
    input.setAttribute('placeholder', 'Your message...');
    const button = this.createElement('button', 'dialog-button', 'Send');
    button.setAttribute('type', 'submit');

    input.setAttribute('disabled', '');
    button.setAttribute('disabled', '');

    this.element.addEventListener('submit', (event) => this.handleSubmit(event));

    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        this.handleSubmit(event);
      }
    });

    this.element.append(input, button);
  }

  private async handleSubmit(event: Event) {
    event.preventDefault();

    const input = this.element.querySelector('.dialog-input');
    if (!(input instanceof HTMLTextAreaElement)) {
      return;
    }

    const message = input.value.trim();

    if (message) {
      input.value = '';
      input.focus();

      const data: MessageSendRequest = {
        id: `${Date.now()}`,
        type: 'MSG_SEND',
        payload: {
          message: {
            to: store.getCheckedUser().login,
            text: message,
          },
        },
      };

      await send(data);
    }
  }

  render() {
    return this.element;
  }
}

export default DialogForm;
