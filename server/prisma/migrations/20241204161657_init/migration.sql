/*
  Warnings:

  - Added the required column `costAt` to the `ProductOnOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameAt` to the `ProductOnOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceAt` to the `ProductOnOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `costAt` to the `ProductOnRestockOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameAt` to the `ProductOnRestockOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceAt` to the `ProductOnRestockOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `productonorder` ADD COLUMN `costAt` DOUBLE NOT NULL,
    ADD COLUMN `nameAt` VARCHAR(191) NOT NULL,
    ADD COLUMN `priceAt` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `productonrestockorder` ADD COLUMN `costAt` DOUBLE NOT NULL,
    ADD COLUMN `nameAt` VARCHAR(191) NOT NULL,
    ADD COLUMN `priceAt` DOUBLE NOT NULL;
