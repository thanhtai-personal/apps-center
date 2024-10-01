import ProductService from "services/product";

export default async function handler(req: any, res: any) {
  try {
    const rs = await ProductService.detailProduct(req.body);
    res.json(rs);
  } catch (error) {
    res.status(500).json(error);
  }
}
