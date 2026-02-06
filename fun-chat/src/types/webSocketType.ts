export interface WebSocketRequest {
  id: string;
  type: 'USER_LOGIN' | 'USER_LOGOUT' | 'ERROR';
  payload: {
    user?: UserRequest;
  } | null;
}

export interface WebSocketResponse {
  id: string;
  type: 'USER_LOGIN' | 'USER_LOGOUT' | 'ERROR';
  payload: {
    user?: UserResponse;
    error?: string;
  } | null;
}

interface UserRequest {
  login: string;
  password: string;
}

interface UserResponse {
  login: string;
  isLogined: boolean;
}
