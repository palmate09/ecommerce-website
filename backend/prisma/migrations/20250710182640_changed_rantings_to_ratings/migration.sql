/*
  Warnings:

  - You are about to drop the `Rantings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Rantings` DROP FOREIGN KEY `Rantings_ProductId_fkey`;

-- DropForeignKey
ALTER TABLE `Rantings` DROP FOREIGN KEY `Rantings_userId_fkey`;

-- DropTable
DROP TABLE `Rantings`;

-- CreateTable
CREATE TABLE `Ratings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rating` VARCHAR(191) NULL,
    `ProductId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Ratings_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ratings` ADD CONSTRAINT `Ratings_ProductId_fkey` FOREIGN KEY (`ProductId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ratings` ADD CONSTRAINT `Ratings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
