import Component from '../../core/Component';
import Search from '../search/Search';
import './style.css';

class UsersList extends Component {
  private readonly search: Search;
  constructor() {
    super('aside', 'content-users');
    this.search = new Search();
  }

  render() {
    const searchHTML = this.search.render();
    this.element.append(searchHTML);

    return this.element;
  }
}

export default UsersList;
