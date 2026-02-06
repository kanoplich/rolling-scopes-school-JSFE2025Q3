import type Component from '../core/Component';

export interface Routes {
  path: string;
  element: Component;
}

export interface Links {
  title: string;
  path: string;
}

export interface Validation {
  isValid: boolean;
  message: string;
}
