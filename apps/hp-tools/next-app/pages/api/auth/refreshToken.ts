import AuthServices from "services/auth";

export default async function handler(req: any, res: any) {
  try {
    const rs = await AuthServices.refreshToken(req.body.refreshToken);
    res.status(200).json(rs);
  } catch (error) {
    res.status(500).json(error);
  }
}
