import creditCardGenerator from "creditcard-generator";

export const cardNumberGen = () => {
  const cardNumber = creditCardGenerator.GenCC("VISA")[0];
  const formattedCard = cardNumber.replace(/(\d{4})(?=\d{4})/g, "$1 ");
  return formattedCard;
};

export const generateCVV = () => {
  const cvv = Math.floor(100 + Math.random() * 900);
  return cvv.toString();
};

export const generateDate = () => {
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
};
