import { authMiddleware } from "middlewares/auth";
import RoleService from "services/role";

export default authMiddleware(async function handler(req: any, res: any) {
  try {
    const rs = await RoleService.searchRoles(req.body);
    res.json(rs);
  } catch (error) {
    res.status(500).json(error);
  }
});
