import Component from '../../core/Component';
import UsersList from '../usersList/UsersList';
import './style.css';

class Content extends Component {
  private readonly aside: UsersList;
  constructor() {
    super('section', 'content');
    this.aside = new UsersList();
  }

  render() {
    const asideHTML = this.aside.render();
    this.element.append(asideHTML);

    return this.element;
  }
}

export default Content;
