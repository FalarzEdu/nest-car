-- AlterTable
ALTER TABLE `User` ADD COLUMN `roles` ENUM('user', 'admin') NOT NULL DEFAULT 'user';
