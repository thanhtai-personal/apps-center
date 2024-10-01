import { connect } from "databases/mongoose";
import { Model } from "mongoose";

const ImageModel = () => {
  return {
    findOne: async (filter: any): Promise<any> => {
      try {
        const Image: Model<any> = (await connect()).Image;
        const rs = await Image.findOne({
          ...filter,
          is_delete: false,
        });
        return rs;
      } catch (error) {
        throw error;
      }
    },
    search: async (filter: any, option: any = {}): Promise<any> => {
      try {
        const { skip = 0, limit = 20 } = option;
        const Image: Model<any> = (await connect()).Image;
        const filterParams = {
          is_delete: false,
        };
        Object.keys(filter).map((key) => {
          if (filter[key].regex) {
            filterParams[key] = {
              $regex: new RegExp(filter[key].regex, "i"),
            };
          } else {
            filterParams[key] = filter[key];
          }
        });
        const data = await Image.find(filterParams).skip(skip).limit(limit);
        const total = await Image.countDocuments(filterParams);
        return { data, total };
      } catch (error) {
        throw error;
      }
    },
    create: async (data: any): Promise<any> => {
      try {
        const Image: Model<any> = (await connect()).Image;
        const rs = new Image(data);
        await rs.save();
        return rs;
      } catch (error) {
        throw error;
      }
    },
    update: async (id, data: any): Promise<any> => {
      try {
        const Image: Model<any> = (await connect()).Image;
        const rs = await Image.findByIdAndUpdate(id, data);
        await rs.save();
        return rs;
      } catch (error) {
        throw error;
      }
    },
    delete: async (id): Promise<any> => {
      try {
        const Image: Model<any> = (await connect()).Image;
        const rs = await Image.findByIdAndUpdate(id, {
          is_delete: true,
        });
        await rs.save();
        return rs;
      } catch (error) {
        throw error;
      }
    },
    multipleDelete: async (ids): Promise<any> => {
      try {
        const Image: Model<any> = (await connect()).Image;
        ids.forEach(async (id) => {
          const rs = await Image.findByIdAndUpdate(id, {
            is_delete: true,
          });
          await rs.save();
        });
        return { mesage: "delete success!" };
      } catch (error) {
        throw error;
      }
    },
    permanentlyDelete: async (id): Promise<any> => {
      try {
        const Image: Model<any> = (await connect()).Image;
        const rs = await Image.findByIdAndDelete(id);
        await rs.save();
        return rs;
      } catch (error) {
        throw error;
      }
    },
  };
};

export default ImageModel();
