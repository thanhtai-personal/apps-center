import branch from "models/branch";
import image from "models/image";

const BranchService = () => {
  const createBranch = async (data) => {
    try {
      const foundBranch = await branch.findOne({ name: data.name });
      if (foundBranch) {
        throw {
          message: "Branch is existed!",
        };
      } else {
        const createdBranch = await branch.create(data);
        return createdBranch;
      }
    } catch (error) {
      throw error;
    }
  };

  const updateBranch = async (data) => {
    try {
      const updatedBranch = await branch.update(data._id, data);
      return updatedBranch;
    } catch (error) {
      throw error;
    }
  };

  const getDetail = async (data) => {
    try {
      const foundBranch = await branch.findOne({ _id: data.id });
      if (!foundBranch) {
        throw {
          message: "Branch is not exist",
        };
      }
      return foundBranch;
    } catch (error) {
      throw error;
    }
  };

  const searchBranchs = async (data: any) => {
    try {
      const { page, rowsPerPage, ...nested } = data;
      const foundBranchs = await branch.search(nested, {
        skip: page * rowsPerPage,
        limit: rowsPerPage,
      });
      const rs = [];
      for (const item of foundBranchs.data || []) {
        let logoObj = {};
        if (item._doc.logo) {
          logoObj = await image.findOne({
            _id: item._doc.logo,
          });
        }
        rs.push({
          ...item._doc,
          logoObj,
        });
      }
      return { data: rs, total: foundBranchs.total };
    } catch (error) {
      throw error;
    }
  };

  const deleteBranch = async (data) => {
    try {
      const foundBranch = await branch.delete(data.id);
      return foundBranch;
    } catch (error) {
      throw error;
    }
  };

  return {
    createBranch,
    updateBranch,
    searchBranchs,
    deleteBranch,
    getDetail,
  };
};

export default BranchService();
