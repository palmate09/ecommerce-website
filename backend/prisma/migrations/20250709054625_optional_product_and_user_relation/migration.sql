-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_userId_fkey`;

-- DropIndex
DROP INDEX `Product_userId_fkey` ON `Product`;

-- AlterTable
ALTER TABLE `Product` MODIFY `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
