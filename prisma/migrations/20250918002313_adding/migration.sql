/*
  Warnings:

  - Added the required column `make` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Car` ADD COLUMN `make` VARCHAR(191) NOT NULL;
