import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  url: { type: mongoose.Schema.Types.String, required: true },
  alt_name: { type: mongoose.Schema.Types.String },
  type: { type: mongoose.Schema.Types.String },
  created_at: { type: mongoose.Schema.Types.Date },
  updated_at: { type: mongoose.Schema.Types.Date },
  is_delete: { type: mongoose.Schema.Types.Boolean },
});

ImageSchema.pre("validate", function (next) {
  if (this.isNew) {
    this.is_delete = false;
    this.type = "resource";
    this.created_at = new Date();
  } else {
    this.updated_at = new Date();
  }
  next();
});

export default ImageSchema;
