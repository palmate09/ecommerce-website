-- DropForeignKey
ALTER TABLE `like` DROP FOREIGN KEY `like_replyId_fkey`;

-- DropForeignKey
ALTER TABLE `like` DROP FOREIGN KEY `like_reviewId_fkey`;

-- DropIndex
DROP INDEX `like_replyId_fkey` ON `like`;

-- DropIndex
DROP INDEX `like_reviewId_fkey` ON `like`;

-- AlterTable
ALTER TABLE `like` MODIFY `reviewId` VARCHAR(191) NULL,
    MODIFY `replyId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `like` ADD CONSTRAINT `like_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `Review`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `like` ADD CONSTRAINT `like_replyId_fkey` FOREIGN KEY (`replyId`) REFERENCES `Reply`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
