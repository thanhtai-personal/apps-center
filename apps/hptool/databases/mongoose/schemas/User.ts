import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: mongoose.Schema.Types.String, required: true },
  email: { type: mongoose.Schema.Types.String, required: true, unique: true },
  password: { type: mongoose.Schema.Types.String, required: true },
  fullname: { type: mongoose.Schema.Types.String },
  phoneNumber: { type: mongoose.Schema.Types.String },
  address: { type: mongoose.Schema.Types.String },
  created_at: { type: mongoose.Schema.Types.Date },
  updated_at: { type: mongoose.Schema.Types.Date },
  roleName: { type: mongoose.Schema.Types.String },
  role: { type: mongoose.Schema.Types.ObjectId },
  is_delete: { type: mongoose.Schema.Types.Boolean },
});

UserSchema.pre("validate", function (next) {
  if (this.isNew) {
    this.is_delete = false;
    this.created_at = new Date();
  } else {
    this.updated_at = new Date();
  }
  next();
});

export default UserSchema;
