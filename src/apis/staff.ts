import { request } from "apis/base";
import {
  CreateStaffData,
  EditStaffData,
  GetStaffsParams,
} from "constants/types/staff.type";

export const staffApi = {
  getAll: (params?: GetStaffsParams) => {
    return request("/staffs", {
      method: "GET",
      params,
    });
  },
  create: (data: CreateStaffData) => {
    return request("/staffs", {
      method: "POST",
      data,
    });
  },
  update: (staffId: string, data: EditStaffData) => {
    return request("/staff/" + staffId, {
      method: "POST",
      data,
    });
  },
  delete: (staffId: string) => {
    return request("/staff/" + staffId, {
      method: "DELETE",
    });
  },
};
