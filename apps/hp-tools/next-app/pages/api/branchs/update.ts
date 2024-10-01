import { authMiddleware } from "middlewares/auth";
import BranchService from "services/branch";

export default authMiddleware(async function handler(req: any, res: any) {
  try {
    const rs = await BranchService.updateBranch(req.body);
    res.json(rs);
  } catch (error) {
    res.status(500).json(error);
  }
});
