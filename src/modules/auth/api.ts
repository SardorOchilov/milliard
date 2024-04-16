import { Types } from ".";
import $http from "@/services/http";

export const Login = (
  data: Types.Login.Request,
): Promise<Types.Login.Response> =>
  $http.get(`auth/employee`, { params: data }).then((res) => res.data);

export const GetMe = (token: string): Promise<Types.Login.Response> =>
  $http
    .get(`auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

export const CompanyLogin = (value: "sales-doctor" | "milliard") => {
  $http
    .post(
      `auth/sap?companyDb=${
        value === "sales-doctor" ? "AE07_MLRD_C21" : "AE07_MLRD_C11 "
      }`,
    )
    .then((res) => res.data);
};
