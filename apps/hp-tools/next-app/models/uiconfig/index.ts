import { connect } from "databases/mongoose";
import { Model } from "mongoose";

const UIconfigModel = () => {
  return {
    findOne: async (filter: any): Promise<any> => {
      try {
        const UIconfig: Model<any> = (await connect()).UIconfig;
        const rs = await UIconfig.findOne({
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
        const UIconfig: Model<any> = (await connect()).UIconfig;
        const data = await UIconfig.find({
          ...filter,
          is_delete: false,
        })
          .skip(skip)
          .limit(limit);
        const total = await UIconfig.countDocuments({
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
        const UIconfig: Model<any> = (await connect()).UIconfig;
        const rs = new UIconfig(data);
        await rs.save();
        return rs;
      } catch (error) {
        throw error;
      }
    },
    update: async (id, data: any): Promise<any> => {
      try {
        const UIconfig: Model<any> = (await connect()).UIconfig;
        const rs = await UIconfig.findByIdAndUpdate(id, data);
        await rs.save();
        return rs;
      } catch (error) {
        throw error;
      }
    },
    delete: async (id): Promise<any> => {
      try {
        const UIconfig: Model<any> = (await connect()).UIconfig;
        const rs = await UIconfig.findByIdAndUpdate(id, {
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
        const UIconfig: Model<any> = (await connect()).UIconfig;
        const rs = await UIconfig.findByIdAndDelete(id);
        await rs.save();
        return rs;
      } catch (error) {
        throw error;
      }
    },
  };
};

export default UIconfigModel();
