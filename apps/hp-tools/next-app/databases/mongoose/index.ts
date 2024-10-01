import mongoose from "mongoose";
import UserSchema from "./schemas/User";
import RoleSchema from "./schemas/Role";
import UIconfigSchema from "./schemas/UIconfig";
import CategorySchema from "./schemas/Category";
import OrderSchema from "./schemas/Order";
import ProductSchema from "./schemas/Product";
import ImageSchema from "./schemas/Image";

const { DATABASE_URL } = process.env;

export const connect = async () => {
  const conn = await mongoose.connect(DATABASE_URL as string);

  return {
    conn,
    User: mongoose.models.User || mongoose.model("User", UserSchema, "user"),
    Role: mongoose.models.Role || mongoose.model("Role", RoleSchema, "role"),
    UIconfig:
      mongoose.models.UIconfig ||
      mongoose.model("UIconfig", UIconfigSchema, "uiconfig"),
    Branch:
      mongoose.models.Branch || mongoose.model("Branch", RoleSchema, "branch"),
    Image:
      mongoose.models.Image || mongoose.model("Image", ImageSchema, "image"),
    Category:
      mongoose.models.Category ||
      mongoose.model("Category", CategorySchema, "category"),
    Order:
      mongoose.models.Order || mongoose.model("Order", OrderSchema, "order"),
    Product:
      mongoose.models.Product ||
      mongoose.model("Product", ProductSchema, "product"),
  };
};
