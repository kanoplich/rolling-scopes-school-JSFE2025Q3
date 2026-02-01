import Component from '../../core/Component';
import './style.css';

class LoginPage extends Component {
  constructor() {
    super('main', 'main');
  }

  render() {
    this.element.textContent = 'Login Page';

    return this.element;
  }
}

export default LoginPage;
