-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_adminId_fkey`;

-- DropIndex
DROP INDEX `Order_adminId_fkey` ON `Order`;

-- AlterTable
ALTER TABLE `Order` MODIFY `adminId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
