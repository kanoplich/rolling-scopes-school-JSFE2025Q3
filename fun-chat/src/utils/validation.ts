import type { Validation } from '../types/type';

export function validateName(name: string): Validation {
  const trimmedName = name.trim();

  if (!name || trimmedName.length === 0) {
    return { isValid: false, message: 'Enter your name' };
  }

  if (trimmedName.length < 2) {
    return {
      isValid: false,
      message: 'The name must contain at least 2 characters',
    };
  }

  if (name.trim().length > 20) {
    return { isValid: false, message: 'The name is too long' };
  }

  return { isValid: true, message: '' };
}

export function validatePassword(password: string): Validation {
  const trimmedPassword = password.trim();
  const passwordRegex = /^(?=.*[A-ZЁА-Я])(?=.*[a-zа-яё])/;

  if (!password || trimmedPassword.length === 0) {
    return { isValid: false, message: 'Enter your password' };
  }

  if (trimmedPassword.length <= 4) {
    return { isValid: false, message: 'The password length must be more than 4 characters' };
  }

  if (!passwordRegex.test(trimmedPassword)) {
    return {
      isValid: false,
      message: 'The password must contain upper and lower case letters',
    };
  }

  return { isValid: true, message: '' };
}

export function validateForm(formData: FormData) {
  const name = formData.get('name');
  const password = formData.get('password');

  const nameValue = typeof name === 'string' ? name.trim() : '';
  const passwordValue = typeof password === 'string' ? password.trim() : '';

  const nameValidation = validateName(nameValue);
  const passwordValidation = validatePassword(passwordValue);

  return {
    nameValidation,
    passwordValidation,
    name: nameValue,
    password: passwordValue,
  };
}

export function showValidateError(element: HTMLElement, data: Validation) {
  if (element.classList.contains('show')) {
    element.textContent = `${data.message}`;
  } else {
    element.classList.add('show');
    element.textContent = `${data.message}`;
  }
}

export function hideValidateError(element: HTMLElement) {
  if (element.classList.contains('show')) {
    element.classList.remove('show');
    element.textContent = '';
  }
}
