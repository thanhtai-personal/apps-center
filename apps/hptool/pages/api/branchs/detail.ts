import BranchService from "services/branch";

export default async function handler(req: any, res: any) {
  try {
    const rs = await BranchService.getDetail(req.body);
    res.json(rs);
  } catch (error) {
    res.status(500).json({
      message: "get detail branch failed",
    });
  }
}
