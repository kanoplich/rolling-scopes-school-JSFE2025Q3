import { store } from '../store/Store';
import type { WebSocketRequest, WebSocketResponse } from '../types/webSocketType';

const responseHandlers = new Map<string, (data: WebSocketResponse) => void>();

export function connect() {
  if (store.getWebSocketStatus()) {
    return;
  }

  try {
    const ws = new WebSocket('ws://localhost:4000/');

    ws.addEventListener('open', open);
    ws.addEventListener('close', close);
    ws.addEventListener('message', message);

    store.setWebSocket(ws);
  } catch (error) {
    console.log(error);
  }
}

function open() {
  store.setWebSocketStatus(true);
  console.log('WS open...');
}

function close() {
  store.setWebSocketStatus(false);
  console.log('WS closed');
}

function message(event: MessageEvent) {
  try {
    const data: WebSocketResponse = JSON.parse(event.data);

    const handler = responseHandlers.get(data.id);
    if (handler) {
      handler(data);
      responseHandlers.delete(data.id);
    }

    handleResponse(data);
  } catch (error) {
    console.log(error);
  }
}

export function send(data: WebSocketRequest): Promise<WebSocketResponse> {
  return new Promise((resolve) => {
    const ws = store.getWebSocket();

    if (!ws) {
      return;
    }

    responseHandlers.set(data.id, (response: WebSocketResponse) => {
      resolve(response);
    });

    try {
      ws.send(JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  });
}

function handleResponse(data: WebSocketResponse) {
  switch (data.type) {
    case 'USER_LOGIN':
    case 'USER_LOGOUT': {
      const { login, isLogined } = data.payload.user;
      store.setUser(login, isLogined);
      store.setAllUsers([]);
      break;
    }
    case 'USER_ACTIVE':
    case 'USER_INACTIVE': {
      const users = data.payload.users;
      store.setAllUsers(users);
      break;
    }
    case 'ERROR': {
      const error = data.payload.error.slice(0, 1).toUpperCase() + data.payload.error.slice(1);
      store.setErrorMessage(error);
      break;
    }
  }
}
