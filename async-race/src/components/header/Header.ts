import Component from '../../core/Component';
import Navigate from '../navigate/Navigate';
import './style.css';

class Header extends Component {
  private readonly navigate: Navigate;

  constructor() {
    super('header', 'header');
    this.navigate = new Navigate();
  }

  render() {
    const navigateHTML = this.navigate.render();
    this.element.append(navigateHTML);

    return this.element;
  }
}

export default Header;
