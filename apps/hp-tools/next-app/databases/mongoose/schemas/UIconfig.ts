import mongoose from "mongoose";

const UIconfigSchema = new mongoose.Schema({
  name: { type: mongoose.Schema.Types.String, required: true, unique: true }, // screen name
  slider_images: { type: mongoose.Schema.Types.Array },
  branchs: { type: mongoose.Schema.Types.Array },
  categories: { type: mongoose.Schema.Types.Array },
  showing_categories: { type: mongoose.Schema.Types.Array },
  app_logo: { type: mongoose.Schema.Types.ObjectId },
  hot_line: { type: mongoose.Schema.Types.String },
  address: { type: mongoose.Schema.Types.String },
  email: { type: mongoose.Schema.Types.String },
  welcome_text: { type: mongoose.Schema.Types.String },
  is_active: { type: mongoose.Schema.Types.Boolean },
  created_at: { type: mongoose.Schema.Types.Date },
  updated_at: { type: mongoose.Schema.Types.Date },
  is_delete: { type: mongoose.Schema.Types.Boolean },
});

UIconfigSchema.pre("validate", function (next) {
  if (this.isNew) {
    this.is_delete = false;
    this.created_at = new Date();
  } else {
    this.updated_at = new Date();
  }
  next();
});

export default UIconfigSchema;
