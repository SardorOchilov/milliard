import { configure, makeAutoObservable } from "mobx";
import { AuthenticationStore } from "@/types/store";

configure({ enforceActions: "never" });

export class Authenticated implements AuthenticationStore {
  isAuthenticated = false;

  constructor() {
    makeAutoObservable(this);
  }

  login() {
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
  }
}
