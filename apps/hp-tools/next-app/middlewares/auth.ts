import AuthServices from "services/auth";

export const authMiddleware = (handler) => {
  return async (req, res) => {
    try {
      const authData = await AuthServices.verifyToken(
        req.headers.authorization
      );
      req.auth = authData.user;
      return handler(req, res);
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  };
};
