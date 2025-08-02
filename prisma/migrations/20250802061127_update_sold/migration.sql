/*
  Warnings:

  - You are about to alter the column `sold` on the `products` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - Added the required column `category` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` ADD COLUMN `category` VARCHAR(255) NOT NULL,
    MODIFY `sold` INTEGER NULL DEFAULT 0,
    MODIFY `target` VARCHAR(255) NULL;
