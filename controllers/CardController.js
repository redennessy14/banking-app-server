import { body } from "express-validator";
import CardModel from "../models/Card.js";
import creditCardGenerator from "creditcard-generator";

export const create = async (req, res) => {
  try {
    const cardNumber = creditCardGenerator.GenCC("VISA")[0];
    const cvv = creditCardGenerator.GenCVV();
    console.log(cvv, cardNumber);
    const generateDate = () => {
      const currentDate = new Date();
      const expirationYear = currentDate.getFullYear() + 1;
      const expirationMonth = (currentDate.getMonth() + 1)
        .toString()
        .padStart(2, "0");
      return `${expirationMonth}/${expirationYear}`;
    };
    const card = new CardModel({
      cardNumber: cardNumber,
      cardType: req.body.cardType,
      cardholderName: req.body.fullName,
      expirationDate,
      cvv: cvv,
      balance: 0,
      creditLimit: "1000000",
      status: "Active",
      userId: req.body._id,
    });
    const creditCard = await card.save();
    res.json(creditCard);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать кредитную карту ",
    });
  }
};
