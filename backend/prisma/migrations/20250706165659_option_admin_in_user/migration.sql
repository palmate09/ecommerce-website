-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_adminId_fkey`;

-- DropIndex
DROP INDEX `User_adminId_fkey` ON `User`;

-- AlterTable
ALTER TABLE `User` MODIFY `adminId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
