import { authMiddleware } from "middlewares/auth";
import { ObjectId } from "mongodb";
import UIconfigService from "services/uiConfig";

export default authMiddleware(async function handler(req: any, res: any) {
  try {
    const dataReq = { ...(req.body || {}) };
    if (dataReq.slider_images) {
      dataReq.slider_images = dataReq.slider_images.map(
        (id) => new ObjectId(id)
      );
    }
    if (dataReq.branchs) {
      dataReq.branchs = dataReq.branchs.map((id) => new ObjectId(id));
    }
    if (dataReq.categories) {
      dataReq.categories = dataReq.categories.map((id) => new ObjectId(id));
    }
    if (dataReq.showing_categories) {
      dataReq.showing_categories = dataReq.showing_categories.map(
        (id) => new ObjectId(id)
      );
    }
    const rs = await UIconfigService.createUIconfig(dataReq);
    res.json(rs);
  } catch (error) {
    res.status(500).json(error);
  }
});
