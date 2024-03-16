import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    unique: true,
  },
  cardType: {
    type: String,
    enum: ["Gold", "Platinum", "Standard"],
    required: true,
  },
  cardholderName: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: String,
  },
  cvv: {
    type: String,
  },
  balance: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["Active", "Blocked", "Lost"],
    default: "Active",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Card", CardSchema);
