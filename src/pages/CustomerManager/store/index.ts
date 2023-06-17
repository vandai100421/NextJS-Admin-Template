import { createState } from "@hookstate/core";
import { customerApi } from "apis/customer";
import {
  Customer as CustomerType,
  GetCustomersParams,
} from "constants/types/customer.type";

type CustomerState = {
  customers: Array<CustomerType>;
  page: number;
  limit: number;
  totalDocs: number;
  totalPages: number;
  isFetchingCustomersData: boolean;
};

const initialState: CustomerState = {
  customers: [],
  page: 1,
  limit: 10,
  totalDocs: 0,
  totalPages: 0,
  isFetchingCustomersData: false,
};

const customerStore = createState(initialState);

export default customerStore;

export const handleGetCustomers = async (params?: GetCustomersParams) => {
  const dataRes = await customerApi.getAll(params);
  const { docs, limit, page, totalPages, totalDocs } = dataRes.data.result;
  customerStore.merge((state) => ({
    ...state,
    customers: docs,
    limit,
    page,
    totalDocs,
    totalPages,
  }));
};
