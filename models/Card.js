import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: true,
    unique: true,
  },
  cardType: {
    type: String,
    enum: ["Credit", "Debit", "Prepaid"],
    required: true,
  },
  cardholderName: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  creditLimit: {
    type: Number,
    default: null,
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
