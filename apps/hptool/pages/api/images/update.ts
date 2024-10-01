import { authMiddleware } from "middlewares/auth";
import ImageService from "services/image";

export default authMiddleware(async function handler(req: any, res: any) {
  try {
    const rs = await ImageService.updateImage(req.body);
    res.json(rs);
  } catch (error) {
    res.status(500).json(error);
  }
});
