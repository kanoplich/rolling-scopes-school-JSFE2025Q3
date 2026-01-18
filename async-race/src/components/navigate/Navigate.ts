import Component from '../../core/Component';
import './style.css';

class Navigate extends Component {
  private readonly navigateItems = [
    {
      id: 'garage',
      title: 'garage',
      href: '/garage',
    },
    {
      id: 'winners',
      title: 'winners',
      href: '/winners',
    },
  ];

  constructor() {
    super('nav', 'nav');
  }

  render() {
    const ul = this.createElement('ul', 'nav-list');

    for (const item of this.navigateItems) {
      const li = this.createElement('li', 'list-item');
      const link = this.createElement('a', 'link', item.title);
      link.setAttribute('href', item.href);

      li.append(link);
      ul.append(li);
    }

    this.element.append(ul);

    return this.element;
  }
}

export default Navigate;
