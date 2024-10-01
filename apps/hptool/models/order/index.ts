import { connect } from "databases/mongoose";
import { Model } from "mongoose";

const OrderModel = () => {
  return {
    findOne: async (filter: any): Promise<any> => {
      try {
        const Order: Model<any> = (await connect()).Order;
        const rs = await Order.findOne({
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
        const Order: Model<any> = (await connect()).Order;
        const data = await Order.find({
          ...filter,
          is_delete: false,
        })
          .skip(skip)
          .limit(limit);
        const total = await Order.countDocuments({
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
        const Order: Model<any> = (await connect()).Order;
        const rs = new Order(data);
        await rs.save();
        return rs;
      } catch (error) {
        throw error;
      }
    },
    update: async (id, data: any): Promise<any> => {
      try {
        const Order: Model<any> = (await connect()).Order;
        const rs = await Order.findByIdAndUpdate(id, data);
        await rs.save();
        return rs;
      } catch (error) {
        throw error;
      }
    },
    delete: async (id): Promise<any> => {
      try {
        const Order: Model<any> = (await connect()).Order;
        const rs = await Order.findByIdAndUpdate(id, {
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
        const Order: Model<any> = (await connect()).Order;
        const rs = await Order.findByIdAndDelete(id);
        await rs.save();
        return rs;
      } catch (error) {
        throw error;
      }
    },
  };
};

export default OrderModel();
