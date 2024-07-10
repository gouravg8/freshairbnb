/*
  Warnings:

  - The `photo` column on the `Listing` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "photo",
ADD COLUMN     "photo" TEXT[];
