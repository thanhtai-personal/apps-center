import { connect } from "databases/mongoose";
import { Model } from "mongoose";

const CategoryModel = () => {
  return {
    findOne: async (filter: any): Promise<any> => {
      try {
        const Category: Model<any> = (await connect()).Category;
        const rs = await Category.findOne({
          ...filter,
          is_delete: false,
        });
        return rs;
      } catch (error) {
        throw error;
      }
    },
    search: async (filter: any, option: any = {}): Promise<any> => {
      try {
        const { skip = 0, limit = 20 } = option;
        const Category: Model<any> = (await connect()).Category;
        const data = await Category.find({
          ...filter,
          is_delete: false,
        })
          .skip(skip)
          .limit(limit);
        const total = await Category.countDocuments({
          ...filter,
          is_delete: false,
        });
        return { data, total };
      } catch (error) {
        throw error;
      }
    },
    create: async (data: any): Promise<any> => {
      try {
        const Category: Model<any> = (await connect()).Category;
        const rs = new Category(data);
        await rs.save();
        return rs;
      } catch (error) {
        throw error;
      }
    },
    update: async (id, data: any): Promise<any> => {
      try {
        const Category: Model<any> = (await connect()).Category;
        const rs = await Category.findByIdAndUpdate(id, data);
        await rs.save();
        return rs;
      } catch (error) {
        throw error;
      }
    },
    delete: async (id): Promise<any> => {
      try {
        const Category: Model<any> = (await connect()).Category;
        const rs = await Category.findByIdAndUpdate(id, {
          is_delete: true,
        });
        await rs.save();
        return rs;
      } catch (error) {
        throw error;
      }
    },
    permanentlyDelete: async (id): Promise<any> => {
      try {
        const Category: Model<any> = (await connect()).Category;
        const rs = await Category.findByIdAndDelete(id);
        await rs.save();
        return rs;
      } catch (error) {
        throw error;
      }
    },
  };
};

export default CategoryModel();
