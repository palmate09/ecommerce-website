/*
  Warnings:

  - You are about to drop the column `categoryName` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[category]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Category` DROP FOREIGN KEY `Category_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_categoryName_fkey`;

-- DropIndex
DROP INDEX `Product_categoryName_fkey` ON `Product`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `categoryName`,
    ADD COLUMN `category` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Category`;

-- CreateIndex
CREATE UNIQUE INDEX `Product_category_key` ON `Product`(`category`);
