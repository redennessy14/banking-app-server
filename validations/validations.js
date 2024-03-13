import { body } from "express-validator";

export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен содержать минимум 5 символов").isLength({
    min: 5,
  }),
  body("fullName", "Укажите имя").isLength({ min: 3 }),
  body("avatarUrl", "Неверная ссылка на аватарку").optional().isURL(),
];

export const CardValidation = [
  body("cardNumber")
    .isCreditCard()
    .withMessage("Неверный номер кредитной карты"),
  body("cardType")
    .isIn(["Credit", "Debit", "Prepaid"])
    .withMessage("Неверный тип карты"),
  body("cardholderName").notEmpty().withMessage("Укажите имя владельца карты"),
  body("expirationDate")
    .isAfter()
    .withMessage("Неверная дата окончания действия"),
  body("cvv").isLength({ min: 3, max: 4 }).withMessage("Неверный CVV"),
  body("balance").isNumeric().withMessage("Баланс должен быть числовым"),
  body("creditLimit")
    .optional()
    .isNumeric()
    .withMessage("Лимит кредита должен быть числовым"),
  body("status")
    .isIn(["Active", "Blocked", "Lost"])
    .withMessage("Неверный статус карты"),
  body("userId")
    .optional()
    .isMongoId()
    .withMessage("Неверный идентификатор пользователя"),
];
