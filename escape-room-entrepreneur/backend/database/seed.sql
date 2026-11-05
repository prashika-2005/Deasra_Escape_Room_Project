-- ============================================================
-- ESCAPE ROOM: THE ENTREPRENEUR'S JOURNEY
-- Seed Data Script
-- ============================================================

USE `entrepreneur_escape_room`;

-- Populate Shop Catalog Items
INSERT INTO `shop_inventory_items` (`item_code`, `item_name`, `item_type`, `cost_xp`, `description`) VALUES
('HINT_01', 'Mentor In-Game Hint', 'HINT', 20, 'Unlocks a direct mentor hint for your current room puzzle.'),
('AVATAR_02', 'The Explorer Avatar Outfit', 'AVATAR', 50, 'Unlocks exclusive Explorer Alex cosmetic styling.'),
('THEME_01', 'Victorian Midnight Dark Theme', 'THEME', 100, 'Unlocks custom visual theme for HUD and dialog UI.')
ON DUPLICATE KEY UPDATE `item_name` = VALUES(`item_name`), `cost_xp` = VALUES(`cost_xp`);
