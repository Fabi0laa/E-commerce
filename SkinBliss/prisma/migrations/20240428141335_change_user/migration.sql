-- AlterTable
ALTER TABLE `User` ADD COLUMN `skinType` ENUM('oily', 'dry', 'combination', 'sensitive', 'not_specified') NOT NULL DEFAULT 'not_specified';
