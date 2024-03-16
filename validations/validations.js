import { body } from "express-validator";

export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен содержать минимум 5 символов").isLength({
    min: 5,
  }),
  body("fullName", "Укажите имя").isLength({ min: 3 }),
  body("avatarUrl", "Неверная ссылка на аватарку").optional().isURL(),
];

export const loginValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен содержать минимум 5 символов").isLength({
    min: 5,
  }),
];

export const CardCreateValidation = [
  body("cardNumber")
    .optional()
    .isCreditCard()
    .withMessage("Неверный номер кредитной карты"),
  body("cardType")
    .isIn(["Gold", "Platinum", "Standard"])
    .withMessage("Неверный тип карты"),
  body("cardholderName").notEmpty().withMessage("Укажите имя владельца карты"),
  body("expirationDate").optional(),
  body("cvv")
    .optional()
    .isLength({ min: 3, max: 4 })
    .withMessage("Неверный CVV"),
  body("balance").isNumeric().withMessage("Баланс должен быть числовым"),
  body("status"),
  body("userId").isMongoId().withMessage("Неверный идентификатор пользователя"),
];
