import LoginForm from '../../components/loginForm/LoginForm';
import Component from '../../core/Component';
import './style.css';

class LoginPage extends Component {
  private readonly loginForm: LoginForm;
  constructor() {
    super('div', 'login-container');
    this.loginForm = new LoginForm();
  }

  render() {
    const title = this.createElement('h2', 'login-title', 'Authorization');
    const formHTML = this.loginForm.render();
    this.element.append(title, formHTML);

    return this.element;
  }
}

export default LoginPage;
