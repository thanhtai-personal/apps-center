import { authMiddleware } from "middlewares/auth";
import OrderService from "services/order";

export default authMiddleware(async function handler(req: any, res: any) {
  try {
    const rs = await OrderService.updateOrder(req.body);
    res.json(rs);
  } catch (error) {
    res.status(500).json(error);
  }
});
