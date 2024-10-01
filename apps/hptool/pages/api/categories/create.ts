import { authMiddleware } from "middlewares/auth";
import CategoryService from "services/category";

export default authMiddleware(async function handler(req: any, res: any) {
  try {
    const rs = await CategoryService.createCategory(req.body);
    res.json(rs);
  } catch (error) {
    res.status(500).json(error);
  }
});
