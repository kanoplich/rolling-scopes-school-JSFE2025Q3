import Component from '../../core/Component';
import Navigate from '../navigate/Navigate';
import './style.css';

class Header extends Component {
  private readonly navigate: Navigate;
  constructor() {
    super('section', 'header');
    this.navigate = new Navigate();
  }

  private createUserElement() {
    const label = this.createElement('div', 'user-title', `User: Andrei`);

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
