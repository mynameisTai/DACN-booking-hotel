import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: String, required: true },
    numberBed: { type: Number, required: true },
    price: { type: Number, required: true },
    types: {
      area: { type: String, required: true },
      text: { type: String, required: true },
    },
    stock: { type: String, required: true, default: "Còn phòng" },
  },
  { timestamps: true }
);

const RoomModel = mongoose.model("Room", roomSchema);
export default RoomModel;
