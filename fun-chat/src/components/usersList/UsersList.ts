import Component from '../../core/Component';
import Search from '../search/Search';
import { send } from '../../api/websocket';
import './style.css';
import type { UserActiveRequest, UserInactiveRequest } from '../../types/webSocketType';
import { store } from '../../store/Store';

class UsersList extends Component {
  private readonly userListContainer: HTMLElement;
  private readonly search: Search;
  constructor() {
    super('aside', 'content-users');
    this.search = new Search();
    this.userListContainer = this.createElement('div', 'users-list-container');
    this.mounted();
  }

  private handleClick(event: Event) {
    const target = event.target;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    const userItem = target.closest('.user-item');
    if (!userItem) {
      return;
    }

    const login = userItem.querySelector('.user-login')?.textContent;
    const users = store.getAllUsers();
    const checkedUser = store.getCheckedUser();
    const user = users.find((user) => user.login === login);

    if (!user) {
      return;
    }

    if (checkedUser.login === user.login) {
      return;
    }

    const input = document.querySelector('.dialog-input');
    const button = document.querySelector('.dialog-button');
    const field = document.querySelector('.dialog-field');

    store.setMessage('');
    store.setCheckedUser(user.login, user.isLogined);

    if (input) {
      input.removeAttribute('disabled');
    }

    if (button) {
      button.removeAttribute('disabled');
    }

    if (field) {
      field.classList.remove('dialog-placeholder');
      field.textContent = '';
      field.innerHTML = '';
    }
  }

  private createUserList() {
    this.userListContainer.innerHTML = '';
    let users = store.getAllUsers();
    const searchValue = store.getSearchValue();

    if (searchValue.length > 0) {
      users = users.filter((user) => user.login.toLowerCase().includes(searchValue.toLowerCase()));
    }

    const ul = this.createElement('ul', 'users-list');
    for (const user of users) {
      const li = this.createElement('li', 'user-item');
      const status = user.isLogined
        ? this.createElement('span', `user-status-online`)
        : this.createElement('span', `user-status-offline`);
      const login = this.createElement('span', 'user-login', `${user.login}`);

      li.append(status, login);
      ul.append(li);
    }

    ul.addEventListener('click', (event) => this.handleClick(event));

    this.userListContainer.append(ul);
  }

  private async loadUsers() {
    store.setAllUsers([]);
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

  private mounted() {
    store.subscribe(() => this.createUserList());
  }

  render() {
    this.loadUsers();
    this.createUserList();
    const searchHTML = this.search.render();
    this.element.append(searchHTML, this.userListContainer);

    return this.element;
  }
}

export default UsersList;
