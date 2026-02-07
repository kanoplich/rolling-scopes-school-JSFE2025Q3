import Component from '../../core/Component';
import Search from '../search/Search';
import { send } from '../../api/websocket';
import './style.css';
import type { UserActiveRequest, UserInactiveRequest } from '../../types/webSocketType';
import { store } from '../../store/Store';

class UsersList extends Component {
  private readonly search: Search;
  constructor() {
    super('aside', 'content-users');
    this.search = new Search();
  }

  private createUserList() {
    this.element.innerHTML = '';
    const users = store.getAllUsers();

    const ul = this.createElement('ul', 'users-list');
    for (const user of users) {
      const li = this.createElement('li', 'user-item');
      const status = this.createElement('span', `user-status-${user.isLogined}`);
      const login = this.createElement('span', 'user-login', `${user.login}`);

      li.append(status, login);
      ul.append(li);
    }

    const searchHTML = this.search.render();
    this.element.append(searchHTML, ul);
  }

  private async loadUsers() {
    const getActiveUsers: UserActiveRequest = {
      id: `${Date.now()}`,
      type: 'USER_ACTIVE',
      payload: null,
    };

    const getInactiveUsers: UserInactiveRequest = {
      id: `${Date.now()}`,
      type: 'USER_INACTIVE',
      payload: null,
    };

    await send(getActiveUsers);
    await send(getInactiveUsers);
  }

  mounted() {
    this.loadUsers();
    store.subscribe(() => this.createUserList());
  }

  render() {
    this.mounted();

    return this.element;
  }
}

export default UsersList;
