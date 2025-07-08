/*
  Warnings:

  - The values [Shipped,cancelled,completed,order_processing,out_for_delivery] on the enum `Order_orderstatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `OriginalPrice` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to drop the column `orderId` on the `payment` table. All the data in the column will be lost.
  - The values [Pending,inProgress,paid,cancelled] on the enum `payment_status` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[paymentId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price` to the `cartItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `payment_orderId_fkey`;

-- DropIndex
DROP INDEX `payment_orderId_fkey` ON `payment`;

-- AlterTable
ALTER TABLE `Cart` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Order` ADD COLUMN `paymentId` VARCHAR(191) NULL,
    MODIFY `orderstatus` ENUM('PLACED', 'CANCELLED') NOT NULL;

-- AlterTable
ALTER TABLE `Product` MODIFY `price` DOUBLE NOT NULL,
    MODIFY `OriginalPrice` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `cartItems` ADD COLUMN `price` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `payment` DROP COLUMN `orderId`,
    ADD COLUMN `amount` DOUBLE NOT NULL,
    MODIFY `status` ENUM('PENDING', 'PAID', 'FAILED') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Order_paymentId_key` ON `Order`(`paymentId`);

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_paymentId_fkey` FOREIGN KEY (`paymentId`) REFERENCES `payment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
