/*
  Warnings:

  - You are about to drop the column `seller` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `count` on the `productonorder` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `productonorder` table. All the data in the column will be lost.
  - Added the required column `sellerId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `ProductOnOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `seller`,
    ADD COLUMN `sellerId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `product` MODIFY `enabled` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `productonorder` DROP COLUMN `count`,
    DROP COLUMN `price`,
    ADD COLUMN `quantity` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` INTEGER NOT NULL,
    `nickName` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RestockOrder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `restockbyId` INTEGER NOT NULL,
    `total` DOUBLE NOT NULL,
    `img` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductOnRestockOrder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `restockOrderId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_sellerId_fkey` FOREIGN KEY (`sellerId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RestockOrder` ADD CONSTRAINT `RestockOrder_restockbyId_fkey` FOREIGN KEY (`restockbyId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductOnRestockOrder` ADD CONSTRAINT `ProductOnRestockOrder_restockOrderId_fkey` FOREIGN KEY (`restockOrderId`) REFERENCES `RestockOrder`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductOnRestockOrder` ADD CONSTRAINT `ProductOnRestockOrder_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
