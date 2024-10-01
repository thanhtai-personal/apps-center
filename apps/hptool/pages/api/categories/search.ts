import CategoryService from "services/category";
export default async function handler(req: any, res: any) {
  try {
    const rs = await CategoryService.searchCategories(req.body);
    res.json(rs);
  } catch (error) {
    res.status(500).json(error);
  }
}