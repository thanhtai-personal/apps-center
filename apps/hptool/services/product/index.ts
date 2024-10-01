import image from "models/image";
import product from "models/product";
import { connect } from "databases/mongoose";
import { Model } from "mongoose";

const ProductService = () => {
  const createProduct = async (data) => {
    try {
      const foundProduct = await product.findOne({ name: data.name });
      if (foundProduct) {
        throw {
          message: "Product is existed!",
        };
      } else {
        const createdProduct = await product.create(data);
        return createdProduct;
      }
    } catch (error) {
      throw error;
    }
  };

  const updateProduct = async (data) => {
    try {
      const updatedProduct = await product.update(data._id, data);
      return updatedProduct;
    } catch (error) {
      throw error;
    }
  };

  const searchProducts = async (data) => {
    try {
      const { page, rowsPerPage, ...nested } = data;
      const skip = page * rowsPerPage;
      const foundProducts = await product.search(nested, {
        skip,
        limit: rowsPerPage,
      });
      const rs = [];
      for (const prd of foundProducts.data) {
        let item = prd._doc;
        if (item.thumb) {
          item.giftsDataList = (
            await product.search({
              _id: { $in: item.gifts || [] },
            })
          )?._doc;
          item.imagesDataList = (
            await image.search({
              _id: { $in: item.images || [] },
            })
          )?._doc;
          item.thumbObj = (
            await image.findOne({
              _id: item.thumb,
            })
          )?._doc;
        }
        rs.push(item);
      }
      return {
        data: rs,
        total: foundProducts.total,
      };
    } catch (error) {
      throw error;
    }
  };

  const deleteProduct = async (data) => {
    try {
      const foundProduct = await product.delete(data.id);
      return foundProduct;
    } catch (error) {
      throw error;
    }
  };

  const detailProduct = async (data) => {
    try {
      const foundProduct = await product.findById(data.id);
      if (foundProduct) {
        const dataProduct = foundProduct._doc;
        if (!dataProduct.is_delete) {
          const giftsDataList = await product.search({
            _id: { $in: foundProduct.gifts || [] },
          });
          const imagesDataList = await image.search({
            _id: { $in: foundProduct.images || [] },
          });
          const thumbObj = await image.findOne({
            _id: foundProduct.thumb,
          });
          return {
            ...dataProduct,
            giftsDataList: giftsDataList.data,
            imagesDataList: imagesDataList.data,
            thumbObj,
          };
        }
      }
      throw {
        message: "Product not found",
      };
    } catch (error) {
      throw error;
    }
  };

  //special function
  const batchUpdate = async ({ field, originText, replaceText }) => {
    try {
      const Product: Model<any> = (await connect()).Product;
      const originTextReg = new RegExp(originText);
      const allProducts = await Product.find({
        is_delete: false,
        [field]: { $regex: originTextReg },
      });
      for (let item of allProducts) {
        await Product.updateOne(
          {
            _id: item._id,
          },
          {
            [field]: item[field].replaceAll(originText, replaceText),
          }
        );
      }
      return {};
      // return await Product.updateMany(
      //   {
      //     is_delete: false,
      //     [field]: { $regex: originTextReg },
      //   },
      //   {
      //     $regexReplace: {
      //       input: `$${field}`,
      //       find: originTextReg,
      //       replacement: replaceText,
      //     },
      //   }
      // );
    } catch (error) {
      throw error;
    }
  };

  const batchDelete = async ({ ids }) => {
    try {
      const Product: Model<any> = (await connect()).Product;
      await Product.updateMany(
        {
          is_delete: false,
          _id: {
            $in: ids,
          },
        },
        {
          is_delete: true,
        }
      );
      return {};
    } catch (error) {
      throw error;
    }
  };

  return {
    createProduct,
    updateProduct,
    searchProducts,
    deleteProduct,
    detailProduct,
    batchUpdate,
    batchDelete,
  };
};

export default ProductService();
