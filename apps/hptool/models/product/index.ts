import { connect } from "databases/mongoose";
import { Model } from "mongoose";

const ProductModel = () => {
  return {
    findById: async (id): Promise<any> => {
      try {
        const Product: Model<any> = (await connect()).Product;
        const rs = await Product.findById(id);
        return rs;
      } catch (error) {
        throw error;
      }
    },
    findOne: async (filter: any): Promise<any> => {
      try {
        const Product: Model<any> = (await connect()).Product;
        const rs = await Product.findOne({
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
        const Product: Model<any> = (await connect()).Product;
        const filterParams = {
          is_delete: false,
        };
        Object.keys(filter).map((key) => {
          if (filter[key].regex) {
            filterParams[key] = {
              $regex: new RegExp(filter[key].regex, "i"),
            };
          } else {
            filterParams[key] = filter[key];
          }
        });
        const data = await Product.find(filterParams).skip(skip).limit(limit);
        const total = await Product.countDocuments(filterParams);
        return { data, total };
      } catch (error) {
        throw error;
      }
    },
    create: async (data: any): Promise<any> => {
      try {
        const Product: Model<any> = (await connect()).Product;
        const rs = new Product(data);
        await rs.save();
        return rs;
      } catch (error) {
        throw error;
      }
    },
    update: async (id, data: any): Promise<any> => {
      try {
        const Product: Model<any> = (await connect()).Product;
        const rs = await Product.findByIdAndUpdate(id, data);
        await rs.save();
        return rs;
      } catch (error) {
        throw error;
      }
    },
    delete: async (id): Promise<any> => {
      try {
        const Product: Model<any> = (await connect()).Product;
        const rs = await Product.findByIdAndUpdate(id, {
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
        const Product: Model<any> = (await connect()).Product;
        const rs = await Product.findByIdAndDelete(id);
        await rs.save();
        return rs;
      } catch (error) {
        throw error;
      }
    },
  };
};

export default ProductModel();
