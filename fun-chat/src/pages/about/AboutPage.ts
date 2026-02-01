import Component from '../../core/Component';
import './style.css';

class AboutPage extends Component {
  constructor() {
    super('main', 'main');
  }

  render() {
    this.element.textContent = 'About Page';

    return this.element;
  }
}

export default AboutPage;
