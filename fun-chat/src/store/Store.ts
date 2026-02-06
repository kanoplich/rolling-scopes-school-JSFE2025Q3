class Store {
  private static instance: Store;
  private user = {
    login: sessionStorage.getItem('login') || '',
    isLogined: sessionStorage.getItem('isLogined') || false,
    error: '',
  };
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

  getUser() {
    return this.user;
  }

  setUser(login: string, isLogined: boolean, error: string) {
    this.user = {
      login,
      isLogined,
      error,
    };
    this.notify();
  }
}

export const store = Store.getInstance();
