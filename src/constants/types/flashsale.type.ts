import { CommonGetAllParams } from "constants/types/common.type";

export type GetAllFlashSaleParams = CommonGetAllParams & {
  name?: string;
  start_time?: string;
  end_time?: string;
};

export type FlashSale = {
  _id: string;
  name: string;
  start_time: string;
  end_time: string;
  status: string;
  created_at: string;
  update_at: string;
};
