import Component from '../../core/Component';
import DialogForm from '../dialogForm/DialogForm';
import { store } from '../../store/Store';
import './style.css';

class Dialog extends Component {
  private readonly form: DialogForm;
  constructor() {
    super('article', 'content-dialog');
    this.form = new DialogForm();
  }

  private createDialog() {
    this.element.innerHTML = '';
    const user = store.getCheckedUser();

    const dialogHeaderElement = this.createElement('div', 'dialog-header');
    const dialogFieldElement = this.createElement('div', 'dialog-field');
    const dialogFormElement = this.form.render();
    this.element.append(dialogHeaderElement, dialogFieldElement, dialogFormElement);

    if (user.login.length === 0) {
      return;
    }

    const loginElement = this.createElement('span', 'dialog-user', `${user.login}`);
    const statusElement = this.createElement(
      'span',
      user.isLogined ? 'dialog-status-online' : 'dialog-status-offline',
      user.isLogined ? 'online' : 'offline'
    );

    dialogHeaderElement.append(loginElement, statusElement);
  }

  mounted() {
    store.subscribe(() => {
      this.createDialog();
    });
  }

  render() {
    this.mounted();

    return this.element;
  }
}

export default Dialog;
