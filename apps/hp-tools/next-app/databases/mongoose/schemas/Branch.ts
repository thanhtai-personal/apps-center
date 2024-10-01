import mongoose from "mongoose";

const BranchSchema = new mongoose.Schema({
  name: { type: mongoose.Schema.Types.String, required: true, unique: true },
  description: { type: mongoose.Schema.Types.String },
  is_delete: { type: mongoose.Schema.Types.Boolean },
  created_at: { type: mongoose.Schema.Types.Date },
  updated_at: { type: mongoose.Schema.Types.Date },
});

BranchSchema.pre("validate", function (next) {
  if (this.isNew) {
    this.is_delete = false;
    this.created_at = new Date();
  } else {
    this.updated_at = new Date();
  }
  next();
});

export default BranchSchema;
