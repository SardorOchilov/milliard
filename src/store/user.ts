import { configure, makeAutoObservable } from "mobx";
import { UserStore } from "@/types/store";
import { Types } from "@modules/auth";

configure({ enforceActions: "never" });

export class User implements UserStore {
  user: Types.IEntity.Employee = {} as Types.IEntity.Employee;

  constructor() {
    makeAutoObservable(this);
  }

  setUser = (user: Types.IEntity.Employee) => {
    this.user = user;
  };
}
