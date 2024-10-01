import { authMiddleware } from "middlewares/auth";
import ProductService from "services/product";

export default authMiddleware(async function handler(req: any, res: any) {
  try {
    const rs = await ProductService.deleteProduct(req.body);
    res.json(rs);
  } catch (error) {
    res.status(500).json(error);
  }
});
