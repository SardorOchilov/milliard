import { Types } from "@modules/auth";

export interface Store {
  authentication: AuthenticationStore;
  user: UserStore;
}

export interface AuthenticationStore {
  isAuthenticated: boolean;
  logout: () => void;
  login: () => void;
}

export interface UserStore {
  user: Types.IEntity.User;
  setUser: (user: Types.IEntity.Employee) => void;
}
