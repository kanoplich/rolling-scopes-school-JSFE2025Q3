import Component from '../../core/Component';
import type { Validation } from '../../types/type';
import {
  hideValidateError,
  showValidateError,
  validateName,
  validatePassword,
} from '../../utils/validation';
import './style.css';

class LoginForm extends Component {
  constructor() {
    super('form', 'form-login');
    this.element.addEventListener('input', this.handleInput.bind(this));
  }

  private handleInput(event: Event) {
    if (!(event.target instanceof HTMLInputElement)) {
      return;
    }

    const target = event.target;

    event.preventDefault();

    switch (target.id) {
      case 'name': {
        const data = validateName(target.value);
        const element = document.querySelector('#name-error');

        if (!element) {
          return;
        }

        this.showError(element, data);
        break;
      }
      case 'password': {
        const data = validatePassword(target.value);
        const element = document.querySelector('#password-error');

        if (!element) {
          return;
        }

        this.showError(element, data);
        break;
      }
    }
  }

  private showError(element: Element, data: Validation) {
    if (!(element instanceof HTMLElement)) {
      return;
    }

    if (data.isValid) {
      hideValidateError(element);
    } else {
      showValidateError(element, data);
    }
  }

  private createFormInput(name: string, type: string) {
    const div = this.createElement('div', 'form-group');
    const label = this.createElement('label', 'form-label', `${name}`);
    label.setAttribute('for', `${name}`);

    const input = this.createElement('input', 'form-input');
    input.setAttribute('type', `${type}`);
    input.setAttribute('id', `${name}`);
    input.setAttribute('placeholder', `Enter ${name}`);

    const error = this.createElement('div', 'form-error');
    error.setAttribute('id', `${name}-error`);

    div.append(label, input, error);

    return div;
  }

  private createFormButton() {
    const button = this.createElement('button', 'form-button', 'Log in');
    button.setAttribute('type', 'submit');
    button.setAttribute('id', 'form-button');

    button.addEventListener('click', (event) => {
      event.preventDefault();

      if (!(this.element instanceof HTMLFormElement)) {
        return;
      }
    });

    return button;
  }

  render() {
    const login = this.createFormInput('name', 'text');
    const password = this.createFormInput('password', 'password');
    const button = this.createFormButton();

    this.element.append(login, password, button);
    return this.element;
  }
}

export default LoginForm;
