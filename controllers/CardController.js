import { body } from "express-validator";
import CardModel from "../models/Card.js";
import * as cardGenerator from "../utils/cardGenerator.js";

export const create = async (req, res) => {
  try {
    const findCard = await CardModel.findOne({
      userId: req.body.userId,
      cardType: req.body.cardType,
    });
    if (findCard) {
      return res.status(400).json({
        message: `У вас уже существует карта типа ${req.body.cardType}`,
      });
    }
    const card = new CardModel({
      cardNumber: cardGenerator.cardNumberGen(),
      cardholderName: req.body.cardholderName,
      cardType: req.body.cardType,
      cvv: cardGenerator.generateCVV(),
      expirationDate: cardGenerator.generateDate(),
      balance: 0,
      status: "Active",
      userId: req.body.userId,
    });
    const creditCard = await card.save();
    console.log(creditCard);
    res.json(creditCard);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать кредитную карту ",
      err,
    });
  }
};

export const getMyCards = async (req, res) => {
  try {
    const userId = req.body.userId;
    const cards = await CardModel.find({ userId: userId })
      .populate("userId")
      .exec();
    res.json(cards);
  } catch (error) {
    console.error("Ошибка при получении карт пользователя", error);
    res.status(500).json({
      message: "Ошибка при получении карт пользователя",
      error: error.message,
    });
  }
};

export const transfer = async (req, res) => {
  try {
    const cardId = req.params.id;
    const recCardNumber = req.body.cardNumber;
    const amount = req.body.amount;

    const senderCard = await CardModel.findById(cardId);
    if (!senderCard) {
      return res
        .status(404)
        .json({ message: "Карточка отправителя не найдена." });
    }

    if (senderCard.balance < amount) {
      return res
        .status(400)
        .json({ message: "Недостаточно средств на карте отправителя." });
    }

    const recipientCard = await CardModel.findOne({
      cardNumber: recCardNumber,
    });
    if (!recipientCard) {
      return res
        .status(404)
        .json({ message: "Карточка получателя не найдена." });
    }

    senderCard.balance -= amount;
    await senderCard.save();

    recipientCard.balance += amount;
    await recipientCard.save();

    res.json({ message: "Перевод успешно выполнен," });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при выполнении перевода." });
  }
};
