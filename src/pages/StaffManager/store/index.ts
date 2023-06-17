import { createState } from "@hookstate/core";
import { staffApi } from "apis/staff";
import { GetStaffsParams, Staff } from "constants/types/staff.type";

type StaffState = {
  staffs: Array<Staff>;
  page: number;
  limit: number;
  total: number;
  isFetchingStaffsData: boolean;
};

const initialState: StaffState = {
  staffs: [],
  page: 1,
  limit: 10,
  total: 0,
  isFetchingStaffsData: false,
};

const staffStore = createState(initialState);

export default staffStore;

export const handleGetStaffs = async (params?: GetStaffsParams) => {
  const dataRes = await staffApi.getAll(params);
  const { docs, limit, page, totalPages } = dataRes.data.result;
  staffStore.merge((state) => ({
    ...state,
    staffs: docs,
    limit,
    page,
    total: totalPages,
  }));
};
