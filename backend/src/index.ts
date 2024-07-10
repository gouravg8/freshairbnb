import { PrismaClient } from "@prisma/client";
import express from "express";
const app = express();

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  app.use("");
  console.log("connected to db");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
