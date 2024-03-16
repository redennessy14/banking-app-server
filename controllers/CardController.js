import { body } from "express-validator";
import CardModel from "../models/Card.js";
import creditCardGenerator from "creditcard-generator";

export const create = async (req, res) => {
  try {
    const cardNumber = creditCardGenerator.GenCC("VISA")[0];
    function generateCVV() {
      const cvv = Math.floor(100 + Math.random() * 900);
      return cvv.toString();
    }
    function generateExpirationDate() {
      const currentDate = new Date();
      let expirationMonth = currentDate.getMonth() + 1;
      const expirationYear = currentDate.getFullYear() + 3;
      if (expirationMonth <= 9) {
        expirationMonth = "0" + expirationMonth;
      }
      const formattedExpirationDate = `${expirationMonth}/${String(
        expirationYear
      ).slice(-2)}`;
      return formattedExpirationDate;
    }
    const card = new CardModel({
      cardNumber: cardNumber,
      cardholderName: req.body.cardholderName,
      cardType: req.body.cardType,
      cvv: generateCVV(),
      expirationDate: generateExpirationDate(),
      balance: 0,
      status: "Active",
      userId: req.body._id,
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
