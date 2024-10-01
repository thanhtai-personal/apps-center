import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  name: { type: mongoose.Schema.Types.String },
  product_id: { type: mongoose.Schema.Types.ObjectId },
  quantity: { type: mongoose.Schema.Types.Number },
  description: { type: mongoose.Schema.Types.String },
  status: { type: mongoose.Schema.Types.String },
  created_at: { type: mongoose.Schema.Types.Date },
  updated_at: { type: mongoose.Schema.Types.Date },
  is_delete: { type: mongoose.Schema.Types.Boolean },
});

OrderSchema.pre("validate", function (next) {
  if (this.isNew) {
    this.is_delete = false;
    this.created_at = new Date();
  } else {
    this.updated_at = new Date();
  }
  next();
});

export default OrderSchema;
