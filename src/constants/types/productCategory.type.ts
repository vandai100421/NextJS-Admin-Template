import { CommonGetAllParams } from "constants/types/common.type";

export type GetProductCategoriesParams = CommonGetAllParams & {
  name?: string;
  status?: string;
  start_time?: string;
  end_time?: string;
  parent_category_id?: string;
};

export type ProductCategory = {
  _id: string;
  name: string;
  description: string;
  parent_category_id: string;
  parent_category_path: Array<string>;
  status: string;
  user_created: string;
  user_updated: string;
  created_at: string;
  updated_at: string;
  has_children?: boolean;
};

export type CreateProductCategoryData = {
  name: string;
  description: string;
  parent_category_id?: string;
  parent_category_path?: Array<string>;
};

export type UpdateProductCategoryData = {
  name: string;
  description: string;
  parent_category_id?: string;
  parent_category_path?: Array<string>;
};
