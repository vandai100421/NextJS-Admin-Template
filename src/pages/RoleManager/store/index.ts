import { createState } from "@hookstate/core";
import { roleApi } from "apis/role";
import { RoleFake } from "constants/types/role.type";

type RoleState = {
  roles: Array<RoleFake>;
};

const initialState: RoleState = {
  roles: [],
};

const roleStore = createState(initialState);

export default roleStore;

export const handleGetRoles = async () => {
  const dataRes = await roleApi.getAll();
  const roles = dataRes.data.result;

  roleStore.merge((state) => ({
    ...state,
    roles,
  }));
};
