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

    if (messageData) {
      const message = this.createElement('div', 'message');
      const date = new Date(messageData.datetime).toLocaleString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
      const messageHeader = this.createElement('div', 'message-header');
      // const messageFooter = this.createElement('div', 'message-footer');
      const user = this.createElement(
        'span',
        'message-user',
        messageData.from === login ? 'You' : `${messageData.from}`
      );

      const time = this.createElement('span', 'message-time', `${date}`);
      const messageText = this.createElement('div', 'message-text', `${messageData.text}`);
      messageHeader.append(user, time);
      message.append(messageHeader, messageText);
      this.element.append(message);
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
