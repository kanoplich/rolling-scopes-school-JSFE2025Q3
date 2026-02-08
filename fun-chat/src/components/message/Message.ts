import Component from '../../core/Component';
import { store } from '../../store/Store';
import './style.css';

class Message extends Component {
  constructor() {
    super('div', 'message-container');
    this.mounted();
  }

  private createMessage() {
    const messageData = store.getMessage();
    const { login } = store.getUser();

    if (messageData instanceof Object) {
      const message = this.createElement('div', 'message');
      const date = new Date(messageData.datetime).toLocaleString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
      const messageHeader = this.createElement('div', 'message-header');
      const messageFooter = this.createElement('div', 'message-footer');

      const status = this.createElement(
        'div',
        'status-delivered',
        messageData.status.isDelivered ? 'Delivered' : 'Sent'
      );

      if (messageData.status.isReaded) {
        status.textContent = 'Read';
      }

      const edited = this.createElement('div', 'status-edited');

      if (messageData.status.isEdited) {
        edited.textContent = 'Edited';
      }

      const user = this.createElement(
        'span',
        'message-user',
        messageData.from === login ? 'You' : `${messageData.from}`
      );

      if (messageData.from === login) {
        message.classList.add('right');
      } else {
        message.classList.add('left');
      }

      const time = this.createElement('span', 'message-time', `${date}`);
      const messageText = this.createElement('div', 'message-text', `${messageData.text}`);
      messageHeader.append(user, time);
      messageFooter.append(edited, status);
      message.append(messageHeader, messageText, messageFooter);
      this.element.append(message);
    } else {
      this.element.innerHTML = '';
    }
  }

  private mounted() {
    store.subscribe(() => {
      this.createMessage();
    });
  }

  render() {
    return this.element;
  }
}

export default Message;
