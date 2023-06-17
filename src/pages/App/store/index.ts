import { createState } from "@hookstate/core";
import { Option, ProductCategoryOption } from "constants/types/common.type";

type AppState = {
  isLogged: boolean;
  productCategoriesSelection: Array<ProductCategoryOption>;
  rolesSelection: Array<Option>;
};

const initialState: AppState = {
  isLogged: false,
  productCategoriesSelection: [],
  rolesSelection: [],
};

const store = createState(initialState);

export default store;
