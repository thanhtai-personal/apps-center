import user from "models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import role from "models/role";

const AuthService = () => {
  const login = async (data) => {
    try {
      const { username, email, password } = data;
      const foundUser = await user.findOne({
        $or: [{ email: { $eq: email } }, { username: { $eq: username } }],
        is_delete: false,
      });
      if (foundUser) {
        const comparedPassword = await bcrypt.compare(
          password,
          foundUser.password
        );
        if (comparedPassword) {
          const authInfo = {
            _id: foundUser._id,
            username: foundUser.username,
            email: foundUser.email,
          };
          return {
            refreshToken: jwt.sign(authInfo, process.env.JWT_SECRET, {
              expiresIn: "720h",
            }),
            token: jwt.sign(authInfo, process.env.JWT_SECRET, {
              expiresIn: "30m",
            }),
          };
        }
      }
      return null;
    } catch (error) {
      throw error;
    }
  };

  const refreshToken = async (refreshToken) => {
    try {
      const decoded = await jwt.verify(refreshToken, process.env.JWT_SECRET);
      if (decoded) {
        const now = Date.now() / 1000;
        if (decoded.exp && now > decoded.exp) {
          throw {
            message: "refresh token expired",
          };
        } else {
          const authData = await user.findOne({ _id: decoded._id });
          return {
            token: jwt.sign(
              {
                username: decoded.username,
                _id: decoded._id,
                email: decoded.email,
              },
              process.env.JWT_SECRET,
              {
                expiresIn: "30m",
              }
            ),
            user: authData,
          };
        }
      }
    } catch (error) {
      throw error;
    }
  };

  const createUser = async (data) => {
    try {
      const foundUser = await user.findOne({ email: data.email });
      if (foundUser) {
        throw {
          message: "user is existed!",
        };
      } else {
        const createdUser = await user.create(data);
        return createdUser;
      }
    } catch (error) {
      throw error;
    }
  };

  const updateUser = async (id, data) => {
    try {
      const foundUser = await user.findOne({ _id: id });
      if (foundUser) {
        const updatedUser = await user.update(id, data);
        return updatedUser;
      } else {
        throw {
          message: "user is not existed!",
        };
      }
    } catch (error) {
      throw error;
    }
  };

  const deleteUser = async (id) => {
    try {
      user.delete(id);
    } catch (error) {
      throw error;
    }
  };

  const createRole = async (data) => {
    try {
      const foundRole = await role.findOne({ name: data.name });
      if (foundRole) {
        throw {
          message: "role is existed!",
        };
      } else {
        const createdRole = await role.create(data);
        return createdRole;
      }
    } catch (error) {
      throw error;
    }
  };

  const updateRole = async (id, data) => {
    try {
      const foundRole = await role.findOne({ _id: id });
      if (foundRole) {
        const updatedRole = await role.update(id, data);
        return updatedRole;
      } else {
        throw {
          message: "role is not existed!",
        };
      }
    } catch (error) {
      throw error;
    }
  };

  const deleteRole = async (id) => {
    try {
      try {
        const foundRole = await role.findOne({ _id: id });
        if (foundRole) {
          await role.delete(id);
          return foundRole;
        } else {
          throw {
            message: "role is not existed!",
          };
        }
      } catch (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
  };

  const verifyToken = async (token) => {
    try {
      const decodedToken = await jwt.verify(
        token.split(" ")[1],
        process.env.JWT_SECRET
      );
      if (decodedToken) {
        const authenUser = await user.findOne({ _id: decodedToken._id });
        const now = Date.now() / 1000;
        if (decodedToken.exp && now > decodedToken.exp) {
          throw {
            message: "token expired",
          };
        } else {
          return {
            token: jwt.sign(
              {
                _id: decodedToken._id,
                username: decodedToken.username,
                email: decodedToken.email,
              },
              process.env.JWT_SECRET,
              {
                expiresIn: "30m",
              }
            ),
            user: authenUser,
          };
        }
      }
    } catch (error) {
      throw error;
    }
  };

  return {
    login,
    refreshToken,
    createUser,
    updateUser,
    deleteUser,
    createRole,
    updateRole,
    deleteRole,
    verifyToken,
  };
};

export default AuthService();
