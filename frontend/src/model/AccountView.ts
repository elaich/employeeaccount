export interface AccountView {
  _id: string;
  holder: string;
  name: string;
  bank: string;
  branch: string;
  account_type: string;
  account_number: string;
  employee_number: string;
  last_update: string;
  [key: string]: string;
}

