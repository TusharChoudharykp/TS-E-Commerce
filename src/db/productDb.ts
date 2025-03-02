import executeQuery from "../models/excuteQuery";

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
const getAllProductsFromDb = async (): Promise<Product[]> => {
  return await executeQuery("SELECT * FROM products");
};

// Get product by ID
const getProductByIdFromDb = async (id: number): Promise<Product[]> => {
  return await executeQuery("SELECT * FROM products WHERE id = ?", [id]);
};

// Insert new product
const insertProduct = async (productData: Product): Promise<any> => {
  const { name, description, price, category_id, stock, image } = productData;
  return await executeQuery(
    `INSERT INTO products (name, description, price, category_id, stock, image) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, description, price, category_id, stock, image || null]
  );
};

// Update product
const updateProductInDb = async (
  id: number,
  productData: Product
): Promise<any> => {
  const { name, description, price, category_id, stock, image } = productData;
  return await executeQuery(
    `UPDATE products SET name = ?, description = ?, price = ?, category_id = ?, stock = ?, image = ? 
     WHERE id = ?`,
    [name, description, price, category_id, stock, image || null, id]
  );
};

// Delete product
const deleteProductFromDb = async (id: number): Promise<any> => {
  return await executeQuery("DELETE FROM products WHERE id = ?", [id]);
};

export {
  getAllProductsFromDb,
  getProductByIdFromDb,
  insertProduct,
  updateProductInDb,
  deleteProductFromDb,
};
