import {
  getCategories,
  getCategoryBySlug,
  getCategoryWithProductCount,
  addCategory,
  updateCategory,
  deleteCategory,
} from "./category";
import {
  addProduct,
  deleteProduct,
  getListProducts,
  getNewestProducts,
  getProducts,
  getProductBySlug,
  getTopSellingProducts,
  updateProduct,
} from "./product";

export const server = {
  getCategories: getCategories(),
  getCategoryWithProductCount: getCategoryWithProductCount(),
  getCategoryBySlug: getCategoryBySlug(),
  addCategory: addCategory(),
  updateCategory: updateCategory(),
  deleteCategory: deleteCategory(),

  getListProducts: getListProducts(),
  getProducts: getProducts(),
  getProductBySlug: getProductBySlug(),
  getTopSellingProducts: getTopSellingProducts(),
  getNewestProducts: getNewestProducts(),
  addProduct: addProduct(),
  updateProduct: updateProduct(),
  deleteProduct: deleteProduct(),
};
