import { CommonGetAllParams } from "constants/types/common.type";

export type GetAllCustomerAddressParams = CommonGetAllParams & {
  customerAddress?: string;
  phone?: string;
  status?: string;
};
