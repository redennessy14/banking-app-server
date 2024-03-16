import express from "express";
import mongoose from "mongoose";
import { UserController, CardController } from "./controllers/index.js";
import {
  registerValidation,
  loginValidation,
  CardCreateValidation,
} from "./validations/validations.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";
import checkAuth from "./utils/checkAuth.js";

const app = express();

mongoose
  .connect(
    "mongodb+srv://redennessy:Nortenos67@cluster0.fvxmkix.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("DB - ok ");
  })
  .catch((err) => {
    console.log(err, "DB error");
  });

app.use(express.json());

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);

app.post(
  "/auth/register",
  handleValidationErrors,
  registerValidation,
  UserController.register
);

app.get("/auth/me", checkAuth, UserController.getMe);

app.post(
  "/cards",
  checkAuth,
  CardCreateValidation,
  handleValidationErrors,
  CardController.create
);

app.get("/cards", checkAuth, CardController.getMyCards);

app.listen(4001, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
