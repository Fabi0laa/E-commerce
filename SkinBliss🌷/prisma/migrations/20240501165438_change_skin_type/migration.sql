-- AlterTable
ALTER TABLE `User` MODIFY `skinType` ENUM('oily', 'dry', 'combination', 'sensitive', 'acne_prone_skin', 'dry_acne_prone_skin', 'hiperpigmentation', 'not_specified') NOT NULL DEFAULT 'not_specified';
