import {
  getAllProductsFromDb,
  getProductByIdFromDb,
  insertProduct,
  updateProductInDb,
  deleteProductFromDb,
} from "../db/productDb";

interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  stock: number;
  image?: string;
}

// Get all products
const getAllProducts = async (): Promise<Product[]> => {
  return await getAllProductsFromDb();
};

// Get product by ID
const getProductById = async (id: number): Promise<Product[]> => {
  return await getProductByIdFromDb(id);
};

// Create a new product (Admin only)
const createProduct = async (productData: Product): Promise<any> => {
  return await insertProduct(productData);
};

// Update a product (Admin only)
const updateProduct = async (
  id: number,
  productData: Product
): Promise<any> => {
  return await updateProductInDb(id, productData);
};

// Delete a product (Admin only)
const deleteProduct = async (id: number): Promise<any> => {
  return await deleteProductFromDb(id);
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
