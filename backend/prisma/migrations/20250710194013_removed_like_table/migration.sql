/*
  Warnings:

  - You are about to drop the `like` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `like` DROP FOREIGN KEY `like_replyId_fkey`;

-- DropForeignKey
ALTER TABLE `like` DROP FOREIGN KEY `like_reviewId_fkey`;

-- DropForeignKey
ALTER TABLE `like` DROP FOREIGN KEY `like_userId_fkey`;

-- DropTable
DROP TABLE `like`;
