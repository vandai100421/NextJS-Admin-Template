import { CommonGetAllParams } from "constants/types/common.type";

export type GetProductsParams = CommonGetAllParams & {
  name?: string;
  sku?: string;
  category_id?: string;
  product_ids?: string;
  product_category_id?: string;
};

export type ProductVariation = {
  name: string;
  options: Array<string>;
  images: Array<string>;
};

export type ProductModel = {
  name?: string;
  sku?: string;
  price: number;
  stock: number;
  promotion_price?: number;
  promotion_stock?: number;
  promotions?: Array<any>;
};

export type Dimension = {
  width: number;
  height: number;
  length: number;
};

export type CreateNewProductData = {
  images: Array<string>;
  videos: Array<string>;
  name: string;
  description: string;
  product_category_id: string;
  extension?: any;

  variations: Array<ProductVariation>;
  models: Array<ProductModel>;
  weight: number;
  dimension: Dimension;
  parent_sku: string;
};

export type EditProductData = {
  images: Array<string>;
  videos: Array<string>;
  name: string;
  description: string;
  product_category_id: string;
  extension?: any;

  variations: Array<ProductVariation>;
  models: Array<ProductModel>;
  weight: number;
  dimension: Dimension;
  parent_sku: string;
};

export type Product = {
  _id?: string;
  images: Array<string>;
  videos: Array<string>;
  name: string;
  description: string;
  product_category_id: string;
  extension?: any;

  variations: Array<ProductVariation>;
  models: Array<ProductModel>;
  weight: number;
  dimension: Dimension;
  sku: string;
  price: number;
  stock: number;
};
