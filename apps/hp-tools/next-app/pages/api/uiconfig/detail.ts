import { authMiddleware } from "middlewares/auth";
import UIconfigService from "services/uiConfig";

export default authMiddleware(async function handler(req: any, res: any) {
  try {
    const dataReq = req.body;
    const rs = await UIconfigService.detailUIconfig(dataReq);
    res.json(rs);
  } catch (error) {
    res.status(500).json(error);
  }
});
