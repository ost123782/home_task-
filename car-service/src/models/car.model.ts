import mongoose from 'mongoose';

const CarSchema = new mongoose.Schema(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Date, required: false, default: null },
    user_id: { type: String, required: true }
  },
  { timestamps: true }
);

CarSchema.methods.toJSON = function () {
  const obj = this.toObject();
  return obj;
};

export default mongoose.model('Car', CarSchema);
