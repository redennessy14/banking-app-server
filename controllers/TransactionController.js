import TransactionHistoryModel from "../models/TransactionHistory.js";

export const transactionGet = async (req, res) => {
  try {
    const cardId = req.body.cardId;
    const transactions = await TransactionHistoryModel.find({
      $or: [{ sender: cardId }, { recipient: cardId }],
    });

    res.json(transactions);
  } catch (error) {
    res.status(404).json({
      message: "Нету истории транзакции",
    });
  }
};
