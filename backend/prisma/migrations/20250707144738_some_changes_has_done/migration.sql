/*
  Warnings:

  - Made the column `reviewId` on table `Reply` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Reply` required. This step will fail if there are existing NULL values in that column.
  - Made the column `replyId` on table `like` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Reply` DROP FOREIGN KEY `Reply_reviewId_fkey`;

-- DropForeignKey
ALTER TABLE `Reply` DROP FOREIGN KEY `Reply_userId_fkey`;

-- DropForeignKey
ALTER TABLE `like` DROP FOREIGN KEY `like_replyId_fkey`;

-- DropIndex
DROP INDEX `Reply_reviewId_fkey` ON `Reply`;

-- DropIndex
DROP INDEX `Reply_userId_fkey` ON `Reply`;

-- DropIndex
DROP INDEX `like_replyId_fkey` ON `like`;

-- AlterTable
ALTER TABLE `Reply` MODIFY `reviewId` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `like` MODIFY `replyId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `like` ADD CONSTRAINT `like_replyId_fkey` FOREIGN KEY (`replyId`) REFERENCES `Reply`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reply` ADD CONSTRAINT `Reply_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `Review`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reply` ADD CONSTRAINT `Reply_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
