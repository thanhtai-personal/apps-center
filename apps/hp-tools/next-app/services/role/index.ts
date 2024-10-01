import role from "models/role";

const RoleService = () => {
  const createRole = async (data) => {
    try {
      const foundRole = await role.findOne({ name: data.name });
      if (foundRole) {
        throw {
          message: "Role is existed!",
        };
      } else {
        const createdRole = await role.create(data);
        return createdRole;
      }
    } catch (error) {
      throw error;
    }
  };

  const updateRole = async (data) => {
    try {
      const updatedRole = await role.update(data._id, data);
      return updatedRole;
    } catch (error) {
      throw error;
    }
  };

  const searchRoles = async (data) => {
    try {
      const { page, rowsPerPage, ...nested } = data;
      const foundRoles = await role.search(nested, {
        skip: page * rowsPerPage,
        limit: rowsPerPage,
      });
      return foundRoles;
    } catch (error) {
      throw error;
    }
  };

  const deleteRole = async (data) => {
    try {
      const foundRole = await role.delete(data.id);
      return foundRole;
    } catch (error) {
      throw error;
    }
  };

  const detailRole = async (data) => {
    try {
      const foundRole = await role.findOne({ _id: data.id });
      return foundRole;
    } catch (error) {
      throw error;
    }
  };

  return {
    createRole,
    updateRole,
    searchRoles,
    deleteRole,
    detailRole,
  };
};

export default RoleService();
