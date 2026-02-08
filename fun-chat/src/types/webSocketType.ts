export type WebSocketRequest =
  | LoginRequest
  | LogoutRequest
  | UserActiveRequest
  | UserInactiveRequest
  | MessageSendRequest
  | MessageFromUserRequest;

export type WebSocketResponse =
  | LoginResponse
  | LogoutResponse
  | UserActiveResponse
  | UserInactiveResponse
  | MessageSendResponse
  | MessageFromUserResponse
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

export interface MessageSendRequest {
  id: string;
  type: 'MSG_SEND';
  payload: {
    message: {
      to: string;
      text: string;
    };
  };
}

export interface MessageSendResponse {
  id: string;
  type: 'MSG_SEND';
  payload: {
    message: MessageResponse;
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

export interface MessageResponse {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: {
    isDelivered: boolean;
    isReaded: boolean;
    isEdited: boolean;
  };
}

interface MessageFromUserRequest {
  id: string;
  type: 'MSG_FROM_USER';
  payload: {
    user: {
      login: string;
    };
  };
}

interface MessageFromUserResponse {
  id: string;
  type: 'MSG_FROM_USER';
  payload: {
    messages: MessageResponse[] | [];
  };
}
