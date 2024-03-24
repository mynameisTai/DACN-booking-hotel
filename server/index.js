import "dotenv/config.js";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import morgan from "morgan";

import routes from "./routes/index.js";
import { authController } from "./controllers/index.js";

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);

//middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));

//Route
app.use(routes);
app.use('/test', authController.login)
// app.use(errorMiddleware);
//Connect
mongoose
  .connect(process.env.STRING_DB, {
    useNewUrlParser: "true",
    useUnifiedTopology: "true",
  })
  .then(() => {
    console.log("Database conection is ready.....!");
  })
  .catch((err) => {
    console.log(err);
  });
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});
