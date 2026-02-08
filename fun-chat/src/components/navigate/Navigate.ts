import Component from '../../core/Component';
import { store } from '../../store/Store';
import { send } from '../../api/websocket';
import type { Links } from '../../types/type';
import type { WebSocketRequest } from '../../types/webSocketType';
import './style.css';

class Navigate extends Component {
  private readonly links: Links[];

  constructor() {
    super('nav', 'nav');
    this.links = [
      { title: 'About', path: '/about' },
      { title: 'Log out', path: '/login' },
    ];
  }

  private createNavList() {
    const ul = this.createElement('ul', 'nav-list');

    for (const link of this.links) {
      const li = this.createElement('li', 'list-item');
      const a = this.createElement('a', 'list-link', `${link.title}`);
      a.setAttribute('href', `${link.path}`);

      if (link.title === 'Log out') {
        a.addEventListener('click', (event) => {
          event.preventDefault();
          this.handleClick();
        });
      }

      li.append(a);
      ul.append(li);
    }

    return ul;
  }

  private async handleClick() {
    const { login } = store.getUser();
    const password = store.getPassword();

    const data: WebSocketRequest = {
      id: `${Date.now()}`,
      type: 'USER_LOGOUT',
      payload: {
        user: {
          login,
          password,
        },
      },
    };

    sessionStorage.setItem('isLogined', `false`);
    store.setCheckedUser('', false);
    store.setMessage('');

    await send(data);
  }

  render() {
    this.element.innerHTML = '';

    const list = this.createNavList();
    this.element.append(list);
    return this.element;
  }
}

export default Navigate;
