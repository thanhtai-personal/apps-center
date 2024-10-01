import OrderService from "services/order";

export default async function handler(req: any, res: any) {
  try {
    const rs = await OrderService.detailOrder(req.body);
    res.json(rs);
  } catch (error) {
    res.status(500).json(error);
  }
}
