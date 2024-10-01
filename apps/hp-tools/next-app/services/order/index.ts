import order from "models/order";

const OrderService = () => {
  const createOrder = async (data) => {
    try {
      const foundOrder = await order.findOne({ name: data.name });
      if (foundOrder) {
        throw {
          message: "Order is existed!",
        };
      } else {
        const createdOrder = await order.create(data);
        return createdOrder;
      }
    } catch (error) {
      throw error;
    }
  };

  const updateOrder = async (data) => {
    try {
      const updatedOrder = await order.update(data._id, data);
      return updatedOrder;
    } catch (error) {
      throw error;
    }
  };

  const searchOrders = async (data) => {
    try {
      const { page, rowsPerPage, ...nested } = data;
      const foundOrders = await order.search(nested, {
        skip: page * rowsPerPage,
        limit: rowsPerPage,
      });
      return foundOrders;
    } catch (error) {
      throw error;
    }
  };

  const deleteOrder = async (data) => {
    try {
      const foundOrder = await order.delete(data.id);
      return foundOrder;
    } catch (error) {
      throw error;
    }
  };

  const detailOrder = async (data) => {
    try {
      const foundOrder = await order.findOne({ _id: data.id });
      return foundOrder;
    } catch (error) {
      throw error;
    }
  };

  return {
    createOrder,
    updateOrder,
    searchOrders,
    deleteOrder,
    detailOrder,
  };
};

export default OrderService();
