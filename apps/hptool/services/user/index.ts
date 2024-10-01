import user from "models/user";

const UserService = () => {
  const createUser = async (data) => {
    try {
      const foundUser = await user.findOne({ name: data.name });
      if (foundUser) {
        throw {
          message: "User is existed!",
        };
      } else {
        const createdUser = await user.create(data);
        return createdUser;
      }
    } catch (error) {
      throw error;
    }
  };

  const updateUser = async (data) => {
    try {
      const updatedUser = await user.update(data._id, data);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  };

  const searchUsers = async (data) => {
    try {
      const { page, rowsPerPage, ...nested } = data;
      const foundUsers = await user.search(nested, {
        skip: page * rowsPerPage,
        limit: rowsPerPage,
      });
      return foundUsers;
    } catch (error) {
      throw error;
    }
  };

  const deleteUser = async (data) => {
    try {
      const foundUser = await user.delete(data.id);
      return foundUser;
    } catch (error) {
      throw error;
    }
  };

  const detailUser = async (data) => {
    try {
      const foundUser = await user.findOne({ _id: data.id });
      return foundUser;
    } catch (error) {
      throw error;
    }
  };

  return {
    createUser,
    updateUser,
    searchUsers,
    deleteUser,
    detailUser,
  };
};

export default UserService();
