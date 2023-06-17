import { GetAllCustomerAddressParams } from "constants/types/customerAddress.type";
import { request } from "apis/base";

export const customerAddressApi = {
  getAll: (params?: GetAllCustomerAddressParams) => {
    return request("/admin/customer-address/all", {
      method: "GET",
      params,
    });
  },
  delete: (customerAddressId: string) => {
    return request("/admin/customer-address/" + customerAddressId, {
      method: "DELETE",
    });
  },
  setDefault: (customerAddressId: string) => {
    return request("/admin/customer-address/" + customerAddressId, {
      method: "PUT",
    });
  },
};
