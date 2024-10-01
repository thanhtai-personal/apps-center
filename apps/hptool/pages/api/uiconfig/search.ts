import UIconfigService from "services/uiConfig";

export default async function handler(req: any, res: any) {
  try {
    const rs = await UIconfigService.searchUIconfigs(req.body);
    res.json(rs);
  } catch (error) {
    res.status(500).json(error);
  }
}
