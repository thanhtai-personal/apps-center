import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: mongoose.Schema.Types.String, required: true },
  level: { type: mongoose.Schema.Types.Number },
  parent: { type: mongoose.Schema.Types.String },
  created_at: { type: mongoose.Schema.Types.Date },
  updated_at: { type: mongoose.Schema.Types.Date },
  is_delete: { type: mongoose.Schema.Types.Boolean },
});

CategorySchema.pre("validate", function (next) {
  if (this.isNew) {
    this.is_delete = false;
    this.created_at = new Date();
  } else {
    this.updated_at = new Date();
  }
  next();
});

export default CategorySchema;
