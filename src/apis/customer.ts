import { request } from "apis/base";
import {
  LockCustomerData,
  CreateNewCustomerData,
  GetCustomersParams,
  EditCustomerData,
} from "constants/types/customer.type";

export const customerApi = {
  getAll: (params?: GetCustomersParams) => {
    return request("/customers", {
      method: "GET",
      params,
    });
  },
  getOne: (customerId: string) => {
    return request("/admin/customers/" + customerId, {
      method: "GET",
    });
  },
  delete: (customerId: string) => {
    return request("/admin/customers/" + customerId, {
      method: "DELETE",
    });
  },
  lock: (data: LockCustomerData) => {
    return request("/admin/customers/lock", {
      method: "POST",
      data,
    });
  },
  create: (data: CreateNewCustomerData) => {
    return request("/customers", {
      method: "POST",
      data,
    });
  },
  update: (id: string, data: EditCustomerData) => {
    return request("/customers/" + id, {
      method: "POST",
      data,
    });
  },
};
