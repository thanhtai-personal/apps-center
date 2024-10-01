import ImageService from "services/image";

export default async function handler(req: any, res: any) {
  try {
    const rs = await ImageService.searchImages(req.body);
    res.json(rs);
  } catch (error) {
    res.status(500).json(error);
  }
}
