import Component from '../../core/Component';
import type { Links } from '../../types/type';
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
      li.append(a);
      ul.append(li);
    }

    return ul;
  }

  render() {
    this.element.innerHTML = '';

    const list = this.createNavList();
    this.element.append(list);
    return this.element;
  }
}

export default Navigate;
