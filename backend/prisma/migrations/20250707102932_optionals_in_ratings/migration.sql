/*
  Warnings:

  - Made the column `ProductId` on table `Rantings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Rantings` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Rantings` DROP FOREIGN KEY `Rantings_ProductId_fkey`;

-- DropForeignKey
ALTER TABLE `Rantings` DROP FOREIGN KEY `Rantings_userId_fkey`;

-- DropIndex
DROP INDEX `Rantings_ProductId_fkey` ON `Rantings`;

-- AlterTable
ALTER TABLE `Rantings` MODIFY `ProductId` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Rantings` ADD CONSTRAINT `Rantings_ProductId_fkey` FOREIGN KEY (`ProductId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rantings` ADD CONSTRAINT `Rantings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
