-- DropForeignKey
ALTER TABLE `like` DROP FOREIGN KEY `like_replyId_fkey`;

-- DropIndex
DROP INDEX `like_replyId_fkey` ON `like`;

-- AlterTable
ALTER TABLE `like` MODIFY `replyId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `like` ADD CONSTRAINT `like_replyId_fkey` FOREIGN KEY (`replyId`) REFERENCES `Reply`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
