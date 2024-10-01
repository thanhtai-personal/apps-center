import category from "models/category";

const CategoryService = () => {
  const createCategory = async (data) => {
    try {
      const foundCategory = await category.findOne({ name: data.name });
      if (foundCategory) {
        throw {
          message: "Category is existed!",
        };
      } else {
        const createdCategory = await category.create(data);
        return createdCategory;
      }
    } catch (error) {
      throw error;
    }
  };

  const updateCategory = async (data) => {
    try {
      const updatedCategory = await category.update(data._id, data);
      return updatedCategory;
    } catch (error) {
      throw error;
    }
  };

  const getDetail = async (data) => {
    try {
      const foundCategory = await category.findOne({ _id: data.id });
      if (!foundCategory) {
        throw {
          message: "Category is not exist",
        };
      }
      return foundCategory;
    } catch (error) {
      throw error;
    }
  };

  const searchCategories = async (data: any) => {
    try {
      const { page, rowsPerPage, ...nested } = data;
      const foundCategories = await category.search(nested, {
        skip: page * rowsPerPage,
        limit: rowsPerPage,
      });
      return foundCategories;
    } catch (error) {
      throw error;
    }
  };

  const deleteCategory = async (data) => {
    try {
      const foundCategory = await category.delete(data.id);
      return foundCategory;
    } catch (error) {
      throw error;
    }
  };

  return {
    createCategory,
    updateCategory,
    searchCategories,
    deleteCategory,
    getDetail,
  };
};

export default CategoryService();
