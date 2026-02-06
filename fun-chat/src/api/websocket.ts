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

    if (!data.payload) {
      return;
    }

    if (data.type === 'ERROR') {
      if (data.payload.error) {
        const error = data.payload.error.slice(0, 1).toUpperCase() + data.payload.error.slice(1);
        const { login } = store.getUser();
        store.setUser(login, false, error);
      }
      return;
    }

    const { user } = data.payload;

    if (!user) {
      return;
    }

    store.setUser(user.login, user.isLogined, '');

    return data;
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
