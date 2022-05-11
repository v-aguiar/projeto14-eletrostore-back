import express, { json } from "express";

import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";

import router from "../routes/router.js";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

app.use(router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    chalk.bold.greenBright("\n🚀 Server is running!") +
      chalk.bold.cyanBright("\n\nListening on port " + PORT + "...\n")
  )
);
