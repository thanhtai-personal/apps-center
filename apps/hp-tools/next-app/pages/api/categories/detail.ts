import { authMiddleware } from "middlewares/auth";
import CategoryService from "services/category";

export default authMiddleware(async function handler(req: any, res: any) {
  try {
    const rs = await CategoryService.getDetail(req.body);
    res.json(rs);
  } catch (error) {
    res.status(500).json({
      message: "get detail category failed",
    });
  }
});
