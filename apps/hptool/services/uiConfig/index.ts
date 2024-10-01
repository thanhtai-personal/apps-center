import branch from "models/branch";
import category from "models/category";
import image from "models/image";
import uiconfig from "models/uiconfig";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const UIconfigService = () => {
  const createUIconfig = async (data) => {
    try {
      const createdUIconfig = await uiconfig.create(data);
      return createdUIconfig;
    } catch (error) {
      throw error;
    }
  };

  const updateUIconfig = async (data) => {
    try {
      const updatedUIconfig = await uiconfig.update(data._id, data);
      return updatedUIconfig;
    } catch (error) {
      throw error;
    }
  };

  const searchUIconfigs = async (data) => {
    try {
      const { page, rowsPerPage, ...nested } = data;
      const foundUIconfigs = await uiconfig.search(nested, {
        skip: page * rowsPerPage,
        limit: rowsPerPage,
      });
      const rsData = [];
      for (let item of foundUIconfigs.data || []) {
        let rsItem = { ...item._doc };
        if (item._doc.app_logo) {
          const foundImage = await image.findOne({
            _id: new ObjectId(item._doc.app_logo),
          });
          rsItem.appLogoObj = foundImage._doc;
        }
        if (item._doc.slider_images) {
          rsItem.sliderImagesDataList = [];
          for (let sliderImage of item._doc.slider_images) {
            if (mongoose.Types.ObjectId.isValid(sliderImage)) {
              const foundImage = await image.findOne({
                _id: new ObjectId(sliderImage),
              });
              rsItem.sliderImagesDataList.push(foundImage);
            }
          }
        }
        if (item._doc.branchs) {
          rsItem.branchsDataList = [];
          for (let _branch of item._doc.branchs) {
            let foundBranch = await branch.findOne({
              _id: new ObjectId(_branch),
            });
            if (foundBranch) {
              const imageObj = await image.findOne({
                _id: foundBranch._doc.logo,
              });
              rsItem.branchsDataList.push({
                ...foundBranch._doc,
                logoObj: imageObj?._doc,
              });
            }
          }
        }

        if (item._doc.categories) {
          rsItem.categoriesDataList = [];
          for (let _category of item._doc.categories) {
            let foundCategory = await category.findOne({
              _id: new ObjectId(_category),
            });
            if (foundCategory) {
              rsItem.categoriesDataList.push({
                ...foundCategory._doc,
              });
            }
          }
        }
        if (item._doc.showing_categories) {
          rsItem.showing_categoriesDataList = [];
          for (let _category of item._doc.showing_categories) {
            let foundCategory = await category.findOne({
              _id: new ObjectId(_category),
            });
            if (foundCategory) {
              rsItem.showing_categoriesDataList.push({
                ...foundCategory._doc,
              });
            }
          }
        }
        rsData.push(rsItem);
      }
      return {
        data: rsData,
        total: foundUIconfigs.total,
      };
    } catch (error) {
      throw error;
    }
  };

  const deleteUIconfig = async (data) => {
    try {
      const foundUIconfig = await uiconfig.delete(data.id);
      return foundUIconfig;
    } catch (error) {
      throw error;
    }
  };

  const detailUIconfig = async (data) => {
    try {
      const foundUIconfig = await uiconfig.findOne({ _id: data.id });
      return foundUIconfig;
    } catch (error) {
      throw error;
    }
  };

  return {
    createUIconfig,
    updateUIconfig,
    searchUIconfigs,
    deleteUIconfig,
    detailUIconfig,
  };
};

export default UIconfigService();
