import $http from "@/services/http";
import { Types } from ".";

export const Get = (): Promise<Types.IEntity.Order[]> =>
  $http.get("/orders").then((res) => res.data);
