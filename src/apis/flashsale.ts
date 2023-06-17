import { request } from "apis/base";
import { GetAllFlashSaleParams } from "constants/types/flashsale.type";

export const flashSaleApi = {
  getAll: (params?: GetAllFlashSaleParams) => {
    return request("/admin/flashsales", {
      method: "GET",
      params,
    });
  },
};
