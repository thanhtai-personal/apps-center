import AuthService from "services/auth";

export default async function handler(req: any, res: any) {
  const { authorization } = req.headers;
  try {
    const rs = await AuthService.verifyToken(authorization);
    res.status(200).json(rs);
  } catch (error) {
    res.status(401).json({ message: error.message || "Invalid token" });
  }
}
