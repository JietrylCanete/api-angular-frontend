// src/app/_models/employee.ts
export interface Employee {
  EmployeeID: string;
  accountId: number;
  departmentId?: number | null;
  positionId?: number | null;
  headEmployeeId?: string | null;
  hireDate?: string | null;
  status: string;

  Account?: {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
  };

  Department?: {
    id: number;
    departmentName: string;
  };

  Position?: {
    id: number;
    name: string;
    status: string;
  };

  Head?: {
    EmployeeID: string;
    Account?: {
      firstName?: string;
      lastName?: string;
    };
  };

  created?: string;
  updated?: string;
}
