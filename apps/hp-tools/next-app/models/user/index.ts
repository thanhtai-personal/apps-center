import { connect } from "databases/mongoose";
import { Model } from "mongoose";

const UserModel = () => {
  return {
    findOne: async (filter: any): Promise<any> => {
      try {
        const User: Model<any> = (await connect()).User;
        const rs = await User.findOne({
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
        const User: Model<any> = (await connect()).User;
        const data = await User.find({
          ...filter,
          is_delete: false,
        })
          .skip(skip)
          .limit(limit);
        const total = await User.countDocuments({
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
        const User: Model<any> = (await connect()).User;
        const rs = new User(data);
        await rs.save();
        return rs;
      } catch (error) {
        throw error;
      }
    },
    update: async (id, data: any): Promise<any> => {
      try {
        const User: Model<any> = (await connect()).User;
        const rs = await User.findByIdAndUpdate(id, data);
        await rs.save();
        return rs;
      } catch (error) {
        throw error;
      }
    },
    delete: async (id): Promise<any> => {
      try {
        const User: Model<any> = (await connect()).User;
        const rs = await User.findByIdAndUpdate(id, {
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
        const User: Model<any> = (await connect()).User;
        const rs = await User.findByIdAndDelete(id);
        await rs.save();
        return rs;
      } catch (error) {
        throw error;
      }
    },
  };
};

export default UserModel();
