import { PrismaClient } from "@prisma/client";
import express from "express";
const app = express();
import bodyParser from "body-parser";
import { authRouter, listingRouter, reviewRouter } from "./routes";
const PORT = 3000;

const prisma = new PrismaClient();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function main() {
  // ... you will write your Prisma Client queries here
  app.use("/auth", authRouter);
  app.use("/listing", listingRouter);
  app.use("/review", reviewRouter);
  console.log("connected to db");
}

app.listen(PORT, () => console.log("port listing on port", PORT));

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
