import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: mongoose.Schema.Types.String, required: true },
  quantity: { type: mongoose.Schema.Types.Number },
  sold: { type: mongoose.Schema.Types.Number },
  remain: { type: mongoose.Schema.Types.Number },
  rating: { type: mongoose.Schema.Types.Number },
  price: { type: mongoose.Schema.Types.Number },
  categories: { type: mongoose.Schema.Types.Array },
  images: { type: mongoose.Schema.Types.Array },
  description: { type: mongoose.Schema.Types.String },
  technique: { type: mongoose.Schema.Types.String },
  created_at: { type: mongoose.Schema.Types.Date },
  updated_at: { type: mongoose.Schema.Types.Date },
  is_delete: { type: mongoose.Schema.Types.Boolean },
  branch: { type: mongoose.Schema.Types.String },
  code: { type: mongoose.Schema.Types.String },
  sku: { type: mongoose.Schema.Types.String },
  model: { type: mongoose.Schema.Types.String },
  engine: { type: mongoose.Schema.Types.String },
  original: { type: mongoose.Schema.Types.String },
  warranty_time: { type: mongoose.Schema.Types.String },
  thumb: { type: mongoose.Schema.Types.ObjectId },
  short_description: { type: mongoose.Schema.Types.String },
  gifts: {
    type: mongoose.Schema.Types.Array,
  },
  videos: {
    type: mongoose.Schema.Types.Array,
  },
});

ProductSchema.pre("validate", function (next) {
  if (this.isNew) {
    this.is_delete = false;
    this.created_at = new Date();
  } else {
    this.updated_at = new Date();
  }
  next();
});

export default ProductSchema;
