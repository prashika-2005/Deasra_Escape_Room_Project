-- ============================================================
-- ESCAPE ROOM: THE ENTREPRENEUR'S JOURNEY
-- MySQL Database Schema Definition
-- Database Name: entrepreneur_escape_room
-- ============================================================

CREATE DATABASE IF NOT EXISTS `entrepreneur_escape_room` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `entrepreneur_escape_room`;

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(36) NOT NULL,
  `full_name` VARCHAR(100) NOT NULL,
  `username` VARCHAR(50) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `avatar_id` VARCHAR(50) NOT NULL DEFAULT 'creator',
  `college_university` VARCHAR(255) NOT NULL,
  `department` VARCHAR(100) NOT NULL,
  `year_of_study` VARCHAR(30) NOT NULL,
  `student_roll_no` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_users_username` (`username`),
  UNIQUE KEY `uk_users_email` (`email`),
  UNIQUE KEY `uk_users_student_roll` (`student_roll_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. USER XP SUMMARY TABLE
CREATE TABLE IF NOT EXISTS `user_xp` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(36) NOT NULL,
  `video_xp` INT NOT NULL DEFAULT 0,
  `quiz_xp` INT NOT NULL DEFAULT 0,
  `activity_xp` INT NOT NULL DEFAULT 0,
  `streak_xp` INT NOT NULL DEFAULT 0,
  `spend_xp` INT NOT NULL DEFAULT 0,
  `total_xp` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_xp_user_id` (`user_id`),
  CONSTRAINT `fk_user_xp_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. XP TRANSACTIONS AUDIT TRAIL TABLE
CREATE TABLE IF NOT EXISTS `xp_transactions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(36) NOT NULL,
  `xp_type` VARCHAR(20) NOT NULL, -- 'VIDEO', 'QUIZ', 'ACTIVITY', 'STREAK', 'SPEND'
  `xp_amount` INT NOT NULL,
  `source_id` VARCHAR(50) NOT NULL,
  `source_name` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_xp_trans_user_id` (`user_id`),
  CONSTRAINT `fk_xp_trans_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. ROOM MODULE PROGRESS TABLE
CREATE TABLE IF NOT EXISTS `room_module_progress` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(36) NOT NULL,
  `module_id` INT NOT NULL,
  `status` VARCHAR(20) NOT NULL DEFAULT 'locked', -- 'locked', 'available', 'in_progress', 'completed'
  `progress_pct` INT NOT NULL DEFAULT 0,
  `state_data` JSON DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_module` (`user_id`, `module_id`),
  CONSTRAINT `fk_room_prog_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. ACTIVITY COMPLETIONS TABLE
CREATE TABLE IF NOT EXISTS `activity_completions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(36) NOT NULL,
  `module_id` INT NOT NULL,
  `activity_type` VARCHAR(20) NOT NULL, -- 'VIDEO', 'QUIZ', 'ACTIVITY'
  `activity_id` VARCHAR(50) NOT NULL,
  `completion_pct` INT NOT NULL DEFAULT 0,
  `score_achieved` INT NOT NULL DEFAULT 0,
  `max_score` INT NOT NULL DEFAULT 0,
  `xp_awarded` INT NOT NULL DEFAULT 0,
  `completed_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_activity` (`user_id`, `activity_id`),
  CONSTRAINT `fk_act_comp_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. PLAYER INVENTORY TABLE
CREATE TABLE IF NOT EXISTS `player_inventory` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(36) NOT NULL,
  `item_id` VARCHAR(50) NOT NULL,
  `item_name` VARCHAR(100) NOT NULL,
  `item_type` VARCHAR(50) NOT NULL,
  `acquired_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_item` (`user_id`, `item_id`),
  CONSTRAINT `fk_inventory_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. SHOP INVENTORY ITEMS CATALOG TABLE
CREATE TABLE IF NOT EXISTS `shop_inventory_items` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `item_code` VARCHAR(50) NOT NULL,
  `item_name` VARCHAR(100) NOT NULL,
  `item_type` VARCHAR(50) NOT NULL, -- 'AVATAR', 'HINT', 'THEME'
  `cost_xp` INT NOT NULL,
  `description` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_shop_item_code` (`item_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. USER PURCHASES TABLE
CREATE TABLE IF NOT EXISTS `user_purchases` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(36) NOT NULL,
  `item_code` VARCHAR(50) NOT NULL,
  `purchased_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_purchase_item` (`user_id`, `item_code`),
  CONSTRAINT `fk_purchases_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_purchases_items` FOREIGN KEY (`item_code`) REFERENCES `shop_inventory_items` (`item_code`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
