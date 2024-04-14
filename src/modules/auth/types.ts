export namespace IEntity {
  export interface User {
    employeeId: number;
    firstName: string;
    lastName: string;
    jobTitle: string;
    externalEmployeeNumber: string;
    employeeCode: string;
    salesPersonCode: any;
    uWarehouse: any;
    uCardCode: any;
  }

  export interface Employee {
    firstName: string;
    lastName: string;
    pager: string;
    salesPersonCode: any;
  }
}

export namespace Login {
  export interface Request {
    EmployeeCode: string;
    ExternalEmployeeNumber: string;
  }

  export interface Response {
    employee: {
      firstName: string;
      lastName: string;
      pager: string;
      salesPersonCode: any;
    };
    accessToken: string;
    refreshToken: string;
  }
}
