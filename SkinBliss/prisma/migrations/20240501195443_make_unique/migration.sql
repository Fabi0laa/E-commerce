/*
  Warnings:

  - A unique constraint covering the columns `[shoppingCartId,productId]` on the table `CartProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `CartProduct_shoppingCartId_productId_key` ON `CartProduct`(`shoppingCartId`, `productId`);
