import executeQuery from "../models/excuteQuery";

interface Category {
  id?: number;
  name: string;
  icon: string;
  color: string;
  text: string;
}

// Get all categories
const getAllCategoriesFromDb = async (): Promise<Category[]> => {
  return await executeQuery("SELECT * FROM categories");
};

// Get category by ID
const getCategoryByIdFromDb = async (id: number): Promise<Category[]> => {
  return await executeQuery("SELECT * FROM categories WHERE id = ?", [id]);
};

// Insert new category
const insertCategory = async (category: Category): Promise<any> => {
  return await executeQuery(
    "INSERT INTO categories (name, icon, color, text) VALUES (?, ?, ?, ?)",
    [category.name, category.icon, category.color, category.text]
  );
};

// Update category
const updateCategoryInDb = async (
  id: number,
  category: Category
): Promise<any> => {
  return await executeQuery(
    "UPDATE categories SET name = ?, icon = ?, color = ?, text = ? WHERE id = ?",
    [category.name, category.icon, category.color, category.text, id]
  );
};

// Delete category
const deleteCategoryFromDb = async (id: number): Promise<any> => {
  return await executeQuery("DELETE FROM categories WHERE id = ?", [id]);
};

export {
  getAllCategoriesFromDb,
  getCategoryByIdFromDb,
  insertCategory,
  updateCategoryInDb,
  deleteCategoryFromDb,
};
