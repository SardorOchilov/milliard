import { configure, makeAutoObservable } from "mobx";
import { UserStore } from "@/types/store";
import { Types } from "@modules/auth";

configure({ enforceActions: "never" });

export class User implements UserStore {
  user: Types.IEntity.User = {} as Types.IEntity.User;

  constructor() {
    makeAutoObservable(this);
  }

  setUser = (user: Types.IEntity.User) => {
    this.user = user;
  };
}
