import Component from '../../core/Component';
import Dialog from '../dialog/Dialog';
import UsersList from '../usersList/UsersList';
import './style.css';

class Content extends Component {
  private readonly aside: UsersList;
  private readonly article: Dialog;
  constructor() {
    super('section', 'content');
    this.aside = new UsersList();
    this.article = new Dialog();
  }

  render() {
    const asideHTML = this.aside.render();
    const articleHTML = this.article.render();

    this.element.append(asideHTML, articleHTML);

    return this.element;
  }
}

export default Content;
