import image from "models/image";

const ImageService = () => {
  const createImage = async (data) => {
    try {
      const foundImage = await image.findOne({ alt_name: data.alt_name });
      if (foundImage) {
        throw {
          message: "Image is existed!",
        };
      } else {
        const createdImage = await image.create(data);
        return createdImage;
      }
    } catch (error) {
      throw error;
    }
  };

  const updateImage = async (data) => {
    try {
      const updatedImage = await image.update(data._id, data);
      return updatedImage;
    } catch (error) {
      throw error;
    }
  };

  const searchImages = async (data: any) => {
    try {
      const { page, rowsPerPage, ...nested } = data;
      const foundImages = await image.search(nested, {
        skip: page * rowsPerPage,
        limit: rowsPerPage,
      });
      return foundImages;
    } catch (error) {
      throw error;
    }
  };

  const deleteImage = async (data) => {
    try {
      const foundImages = await image.delete(data.id);
      return foundImages;
    } catch (error) {
      throw error;
    }
  };

  const deleteImages = async (data) => {
    try {
      const foundImages = await image.multipleDelete(data.ids);
      return foundImages;
    } catch (error) {
      throw error;
    }
  };

  return {
    createImage,
    updateImage,
    searchImages,
    deleteImage,
    deleteImages,
  };
};

export default ImageService();
