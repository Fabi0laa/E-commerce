/*
  Warnings:

  - Added the required column `skinType` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `skinType` ENUM('oily', 'dry', 'combination', 'sensitive', 'acne_prone_skin', 'dry_acne_prone_skin', 'hiperpigmentation', 'not_specified') NOT NULL;
