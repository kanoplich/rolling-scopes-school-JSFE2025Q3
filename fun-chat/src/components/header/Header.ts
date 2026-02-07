import Component from '../../core/Component';
import Navigate from '../navigate/Navigate';
import { store } from '../../store/Store';
import './style.css';

class Header extends Component {
  private readonly navigate: Navigate;
  constructor() {
    super('section', 'header');
    this.navigate = new Navigate();
  }

  private createUserElement() {
    const { login } = store.getUser();
    const label = this.createElement('div', 'user-title', `User: ${login}`);

    return label;
  }

  render() {
    this.element.innerHTML = '';

    const userTitle = this.createUserElement();
    const appTitle = this.createElement('h1', 'chat-title', 'FUN Chat');
    const navigateHTML = this.navigate.render();

    this.element.append(userTitle, appTitle, navigateHTML);
    return this.element;
  }
}

export default Header;
