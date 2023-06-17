import { CommonGetAllParams } from "constants/types/common.type";

export type GetStaffsParams = CommonGetAllParams & {
  last_name?: string;
  email?: string;
  phone?: string;
  status?: string;
  start_time?: number;
  end_time?: number;
};

export type Staff = {
  _id: string;
  first_name: string;
  last_name: string;
  username: string;
  date_of_birth: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type CreateStaffData = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  roles: Array<string>;
};

export type EditStaffData = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone: string;
  roles: Array<string>;
};
