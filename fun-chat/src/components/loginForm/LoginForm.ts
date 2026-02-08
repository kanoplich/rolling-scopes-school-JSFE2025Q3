import { send } from '../../api/websocket';
import Component from '../../core/Component';
import { store } from '../../store/Store';
import type { Validation } from '../../types/type';
import type { WebSocketRequest } from '../../types/webSocketType';
import {
  hideValidateError,
  showValidateError,
  validateForm,
  validateName,
  validatePassword,
} from '../../utils/validation';
import './style.css';

class LoginForm extends Component {
  private nameError!: HTMLElement | null;
  private passwordError!: HTMLElement | null;

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
        this.showError(this.nameError, data);
        break;
      }
      case 'password': {
        const data = validatePassword(target.value);
        this.showError(this.passwordError, data);
        break;
      }
    }
  }

  private showError(element: HTMLElement | null, data: Validation) {
    if (!element) {
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
    input.setAttribute('name', `${name}`);
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
      this.handleButtonClick(event);
    });

    return button;
  }

  private handleButtonClick(event: Event) {
    event.preventDefault();

    if (!(this.element instanceof HTMLFormElement)) {
      return;
    }

    const formData = new FormData(this.element);
    const { name, password, nameValidation, passwordValidation } = validateForm(formData);

    if (!nameValidation.isValid) {
      this.showError(this.nameError, nameValidation);
    }

    if (!passwordValidation.isValid) {
      this.showError(this.passwordError, passwordValidation);
    }

    if (nameValidation.isValid && passwordValidation.isValid && store.getWebSocketStatus()) {
      this.authorization(name, password);
    }
  }

  private async authorization(name: string, password: string) {
    const data: WebSocketRequest = {
      id: `${Date.now()}`,
      type: 'USER_LOGIN',
      payload: {
        user: {
          login: name,
          password,
        },
      },
    };

    try {
      await send(data);

      const { isLogined } = store.getUser();

      if (isLogined) {
        sessionStorage.setItem('login', name);
        sessionStorage.setItem('isLogined', `${isLogined}`);
        store.setPassword(password);

        globalThis.history.replaceState({}, '', '/');
        globalThis.dispatchEvent(new PopStateEvent('popstate'));
      } else {
        const data = {
          isValid: false,
          message: store.getErrorMessage(),
        };

        if (!this.passwordError) {
          return;
        }

        showValidateError(this.passwordError, data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    this.element.innerHTML = '';

    const login = this.createFormInput('name', 'text');
    const password = this.createFormInput('password', 'password');
    const button = this.createFormButton();

    this.element.append(login, password, button);

    this.nameError = this.element.querySelector('#name-error');
    this.passwordError = this.element.querySelector('#password-error');

    return this.element;
  }
}

export default LoginForm;
