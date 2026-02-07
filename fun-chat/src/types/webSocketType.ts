export type WebSocketRequest =
  | LoginRequest
  | LogoutRequest
  | UserActiveRequest
  | UserInactiveRequest;

export type WebSocketResponse =
  | LoginResponse
  | LogoutResponse
  | UserActiveResponse
  | UserInactiveResponse
  | Error;

interface LoginRequest {
  id: string;
  type: 'USER_LOGIN';
  payload: {
    user: UserRequest;
  };
}

interface LoginResponse {
  id: string;
  type: 'USER_LOGIN';
  payload: {
    user: UserResponse;
  };
}

interface LogoutRequest {
  id: string;
  type: 'USER_LOGOUT';
  payload: {
    user: UserRequest;
  };
}

interface LogoutResponse {
  id: string;
  type: 'USER_LOGOUT';
  payload: {
    user: UserResponse;
  };
}

export interface UserActiveRequest {
  id: string;
  type: 'USER_ACTIVE';
  payload: null;
}

interface UserActiveResponse {
  id: string;
  type: 'USER_ACTIVE';
  payload: {
    users: UserResponse[];
  };
}

export interface UserInactiveRequest {
  id: string;
  type: 'USER_INACTIVE';
  payload: null;
}

interface UserInactiveResponse {
  id: string;
  type: 'USER_INACTIVE';
  payload: {
    users: UserResponse[];
  };
}

interface Error {
  id: string;
  type: 'ERROR';
  payload: {
    error: string;
  };
}

interface UserRequest {
  login: string;
  password: string;
}

export interface UserResponse {
  login: string;
  isLogined: boolean;
}
