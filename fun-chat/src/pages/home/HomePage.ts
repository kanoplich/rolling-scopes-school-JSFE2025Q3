import Component from '../../core/Component';
import './style.css';

class HomePage extends Component {
  constructor() {
    super('main', 'main');
  }

  render() {
    this.element.textContent = 'Home Page';

    return this.element;
  }
}

export default HomePage;
