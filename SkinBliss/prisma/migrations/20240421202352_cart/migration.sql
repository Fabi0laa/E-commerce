-- CreateTable
CREATE TABLE `ShoppingCart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    UNIQUE INDEX `ShoppingCart_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CartProduct` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shoppingCartId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ShoppingCart` ADD CONSTRAINT `ShoppingCart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartProduct` ADD CONSTRAINT `CartProduct_shoppingCartId_fkey` FOREIGN KEY (`shoppingCartId`) REFERENCES `ShoppingCart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartProduct` ADD CONSTRAINT `CartProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
