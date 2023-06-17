export type CommonGetAllParams = {
  page?: number;
  limit?: number;
};

export type Status = "actived" | "unactive" | "locked" | "deleted";

export type Option = {
  value: any;
  label: string;
};

export type ProductCategoryOption = Option & {
  has_children: boolean;
  parent_category_id: string;
};
