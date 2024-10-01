import { connect } from "databases/mongoose";
import { Model } from "mongoose";

const RoleModel = () => {
  return {
    findOne: async (filter: any): Promise<any> => {
      try {
        const Role: Model<any> = (await connect()).Role;
        const rs = await Role.findOne({
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
        const Role: Model<any> = (await connect()).Role;
        const data = await Role.find({
          ...filter,
          is_delete: false,
        })
          .skip(skip)
          .limit(limit);
        const total = await Role.countDocuments({
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
        const Role: Model<any> = (await connect()).Role;
        const rs = new Role(data);
        await rs.save();
        return rs;
      } catch (error) {
        throw error;
      }
    },
    update: async (id, data: any): Promise<any> => {
      try {
        const Role: Model<any> = (await connect()).Role;
        const rs = await Role.findByIdAndUpdate(id, data);
        await rs.save();
        return rs;
      } catch (error) {
        throw error;
      }
    },
    delete: async (id): Promise<any> => {
      try {
        const Role: Model<any> = (await connect()).Role;
        const rs = await Role.findByIdAndUpdate(id, {
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
        const Role: Model<any> = (await connect()).Role;
        const rs = await Role.findByIdAndDelete(id);
        await rs.save();
        return rs;
      } catch (error) {
        throw error;
      }
    },
  };
};

export default RoleModel();
