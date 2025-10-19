// src/app/_models/request.ts
export interface RequestItem {
  name: string;
  quantity: number;
}

export interface Request {
  id?: number;
  accountId: number;
  type: string;
  items: RequestItem[] | string;
  quantity: number;
  status?: string;
  approverId?: number;
  Approver?: {
    id: number;
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  Account?: {
    id: number;
    firstName?: string;
    lastName?: string;
    email?: string;
  };
}
