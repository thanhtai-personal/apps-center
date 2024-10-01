import { authMiddleware } from "middlewares/auth";
import UserService from "services/user";

export default authMiddleware(async function handler(req: any, res: any) {
  try {
    const rs = await UserService.detailUser(req.body);
    res.json(rs);
  } catch (error) {
    res.status(500).json(error);
  }
});
