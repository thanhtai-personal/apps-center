import { authMiddleware } from "middlewares/auth";
import ProductService from "services/product";
import { ObjectId } from "mongodb";

export default authMiddleware(async function handler(req: any, res: any) {
  try {
    const reqData = {
      ...req.body,
      images: req.body.images.map((id) => new ObjectId(id)),
    };
    const rs = await ProductService.updateProduct(reqData);
    res.json(rs);
  } catch (error) {
    res.status(500).json(error);
  }
});
