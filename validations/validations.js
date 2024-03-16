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
  body("cardNumber", "Неверный номер кредитной карты")
    .optional()
    .isCreditCard(),
  body("cardType", "Неверный тип карты").isIn(["Gold", "Platinum", "Standard"]),
  body("cardholderName", "Укажите имя владельца карты").notEmpty(),
  body("expirationDate").optional(),
  body("cvv").optional().isLength({ min: 3, max: 4 }),
  body("balance").optional(),
  body("status"),
  body("userId", "Неверный идентификатор пользователя").isMongoId(),
];

export const CardTransferValidation = [
  body("amount", "Укажите баланс который хотите перевести").isNumeric(),
  body("cardNumber", "Лицевой счет должен содержать минимум 16 цифер").isLength(
    { min: 16 }
  ),
];
