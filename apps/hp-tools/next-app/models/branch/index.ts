import { connect } from "databases/mongoose";
import { Model } from "mongoose";

const BranchModel = () => {
  return {
    findOne: async (filter: any): Promise<any> => {
      try {
        const Branch: Model<any> = (await connect()).Branch;
        const rs = await Branch.findOne({
          ...filter,
          is_delete: false,
        });
        return rs;
      } catch (error) {
        throw error;
      }
    },
    search: async (filter: any, option: any): Promise<any> => {
      try {
        const { skip = 0, limit = 200 } = option;
        const Branch: Model<any> = (await connect()).Branch;
        const data = await Branch.find({
          ...filter,
          is_delete: false,
        })
          .skip(skip)
          .limit(limit);
        const total = await Branch.countDocuments({
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
        const Branch: Model<any> = (await connect()).Branch;
        const rs = new Branch(data);
        await rs.save();
        return rs;
      } catch (error) {
        throw error;
      }
    },
    update: async (id, data: any): Promise<any> => {
      try {
        const Branch: Model<any> = (await connect()).Branch;
        const rs = await Branch.findByIdAndUpdate(id, data);
        await rs.save();
        return rs;
      } catch (error) {
        throw error;
      }
    },
    delete: async (id): Promise<any> => {
      try {
        const Branch: Model<any> = (await connect()).Branch;
        const rs = await Branch.findByIdAndUpdate(id, {
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
        const Branch: Model<any> = (await connect()).Branch;
        const rs = await Branch.findByIdAndDelete(id);
        await rs.save();
        return rs;
      } catch (error) {
        throw error;
      }
    },
  };
};

export default BranchModel();
