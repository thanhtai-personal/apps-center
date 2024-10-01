import AuthService from "services/auth";

export default async function handler(req: any, res: any) {
  const { username, password, email } = req.body;
  try {
    const tokenData = await AuthService.login({ username, password, email });
    if (tokenData) {
      res.json(tokenData);
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.log("error", error)
    res.status(401).json({ message: "Invalid username or password" });
  }
}
