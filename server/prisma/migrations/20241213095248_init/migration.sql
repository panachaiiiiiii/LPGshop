/*
  Warnings:

  - Added the required column `PayBy` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `PayBy` VARCHAR(191) NOT NULL,
    ADD COLUMN `total` DOUBLE NOT NULL;
