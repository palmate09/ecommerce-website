/*
  Warnings:

  - You are about to drop the column `descrption` on the `Reply` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Reply` DROP COLUMN `descrption`,
    ADD COLUMN `description` VARCHAR(191) NULL;
