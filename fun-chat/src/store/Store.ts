import type { UserResponse } from '../types/webSocketType';

class Store {
  private static instance: Store;
  private user = {
    login: sessionStorage.getItem('login') || '',
    isLogined: sessionStorage.getItem('isLogined') || false,
  };
  private allUsers: UserResponse[] = [];
  private checkedUser = {
    login: '',
    isLogined: false,
  };
  private errorMessage = '';
  private password = '';
  private isConnected = false;
  private webSocket: WebSocket | undefined = undefined;
  private listeners: (() => void)[] = [];

  static getInstance(): Store {
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance;
  }

  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    for (const listener of this.listeners) {
      listener();
    }
  }

  getWebSocketStatus() {
    return this.isConnected;
  }

  setWebSocketStatus(isConnected: boolean) {
    this.isConnected = isConnected;
  }

  getWebSocket() {
    return this.webSocket;
  }

  setWebSocket(ws: WebSocket) {
    this.webSocket = ws;
  }

  setPassword(password: string) {
    this.password = password;
  }

  getPassword() {
    return this.password;
  }

  setErrorMessage(error: string) {
    this.errorMessage = error;
  }

  getErrorMessage() {
    return this.errorMessage;
  }

  setUser(login: string, isLogined: boolean) {
    this.user = {
      login,
      isLogined,
    };
  }

  getUser() {
    return this.user;
  }

  setAllUsers(users: UserResponse[]) {
    this.allUsers = users.length === 0 ? [] : [...this.allUsers, ...users];
    this.notify();
  }

  getAllUsers() {
    return this.allUsers;
  }

  setCheckedUser(login: string, isLogined: boolean) {
    this.checkedUser = {
      login,
      isLogined,
    };
    this.notify();
  }

  getCheckedUser() {
    return this.checkedUser;
  }
}

export const store = Store.getInstance();
