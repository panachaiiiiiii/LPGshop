/*
  Warnings:

  - You are about to drop the column `total` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `costAt` on the `productonrestockorder` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `restockorder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `total`;

-- AlterTable
ALTER TABLE `productonrestockorder` DROP COLUMN `costAt`;

-- AlterTable
ALTER TABLE `restockorder` DROP COLUMN `total`;
