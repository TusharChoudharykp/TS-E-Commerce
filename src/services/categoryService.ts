import {
  getAllCategoriesFromDb,
  getCategoryByIdFromDb,
  insertCategory,
  updateCategoryInDb,
  deleteCategoryFromDb,
} from "../db/categoryDb";

interface Category {
  id?: number;
  name: string;
  icon: string;
  color: string;
  text: string;
}

// Get all categories
const getAllCategories = async () => {
  return await getAllCategoriesFromDb();
};

// Get category by ID
const getCategoryById = async (id: number) => {
  return await getCategoryByIdFromDb(id);
};

// Create a new category
const createCategory = async (categoryData: Category) => {
  return await insertCategory(categoryData);
};

// Update category
const updateCategory = async (id: number, categoryData: Category) => {
  return await updateCategoryInDb(id, categoryData);
};

// Delete category
const deleteCategory = async (id: number) => {
  return await deleteCategoryFromDb(id);
};

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
