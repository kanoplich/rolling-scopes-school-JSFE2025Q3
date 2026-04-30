import Component from '../../core/Component';
import './style.css';

class NotFoundPage extends Component {
  constructor() {
    super('div', 'notfound-page');
  }

  render() {
    const error = this.createElement('div', 'notfound-error', '404');
    const text = this.createElement('div', 'notfound-text', 'Page not Found');

    this.element.append(error, text);

    return this.element;
  }
}

export default NotFoundPage;
