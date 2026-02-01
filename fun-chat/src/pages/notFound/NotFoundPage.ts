import Component from '../../core/Component';
import './style.css';

class NotFoundPage extends Component {
  constructor() {
    super('div', 'notfound-page');
  }

  render() {
    this.element.textContent = 'Not Found';

    return this.element;
  }
}

export default NotFoundPage;
