import $http from "@/services/http";
import { Types } from ".";

export const Get = (skip?: number): Promise<Types.IEntity.Client[]> =>
  $http.get("/business-partners").then((res) => res.data.data);

export const GetSingle = ({ code }: { code: string }): Promise<any> =>
  $http.get(`/business-partners/${code}`).then((res) => res.data.data);

// export const GetReturns = ({
//   code,
//   skip,
// }: {
//   code: string;
//   skip: number;
// }): Promise<any[]> =>
//   $http
//     .get(`/returns/business-partner/${code}/${skip}`)
//     .then((res) => res.data.data);
//
// export const GetInvoices = ({
//   code,
//   skip,
// }: {
//   code: string;
//   skip: number;
// }): Promise<any[]> =>
//   $http
//     .get(`/invoices/business-partner/${code}/${skip}`)
//     .then((res) => res.data.data);
//
// export const GetPayments = ({
//   code,
//   skip,
// }: {
//   code: string;
//   skip: number;
// }): Promise<any[]> =>
//   $http
//     .get(`/incoming-payments/business-partner/${code}/${skip}`)
//     .then((res) => res.data.data);
