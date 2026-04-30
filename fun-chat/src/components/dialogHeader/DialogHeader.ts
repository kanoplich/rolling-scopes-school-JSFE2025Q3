import Component from '../../core/Component';
import { store } from '../../store/Store';
import './style.css';

class DialogHeader extends Component {
  constructor() {
    super('div', 'dialog-header');
    this.mounted();
  }

  private addElements() {
    this.element.innerHTML = '';
    const checkedUser = store.getCheckedUser();

    if (checkedUser.login.length > 0) {
      const loginElement = this.createElement('span', 'dialog-user', `${checkedUser.login}`);
      const statusElement = this.createElement(
        'span',
        checkedUser.isLogined ? 'dialog-status-online' : 'dialog-status-offline',
        checkedUser.isLogined ? 'online' : 'offline'
      );

      this.element.append(loginElement, statusElement);
    }
  }

  private mounted() {
    store.subscribe(() => {
      this.addElements();
    });
  }

  render() {
    return this.element;
  }
}

export default DialogHeader;
