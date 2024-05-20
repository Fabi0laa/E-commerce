/*
  Warnings:

  - The primary key for the `CartProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CartProduct` table. All the data in the column will be lost.
  - You are about to drop the `OrderProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Orders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `OrderProduct` DROP FOREIGN KEY `OrderProduct_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `Orders` DROP FOREIGN KEY `Orders_addressId_fkey`;

-- DropForeignKey
ALTER TABLE `Orders` DROP FOREIGN KEY `Orders_userId_fkey`;

-- AlterTable
ALTER TABLE `CartProduct` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`shoppingCartId`, `productId`);

-- DropTable
DROP TABLE `OrderProduct`;

-- DropTable
DROP TABLE `Orders`;
