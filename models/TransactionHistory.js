import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "Card" },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "Card" },
  amount: Number,
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Transaction", transactionSchema);
