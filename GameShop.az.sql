/* Site Settings */
CREATE TABLE `SiteSettings` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`navbar_mainpage` VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Main Page',
	`navbar_games` VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Games',
	`navbar_aboutus` VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'About Us',
	`navbar_contactus` VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Contact Us',
	`header_contact_num` VARCHAR(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '+994507773808',
	`header_email` VARCHAR(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'info@example.com',
	`off_FB` VARCHAR(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'https://fb.com',
	`off_IG` VARCHAR(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'https://instagram.com',
	`off_TW` VARCHAR(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'https://twitter.com',
	`whywe_guarantie` VARCHAR(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'We Guarantied 100%',
	`whywe_quality` VARCHAR(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Quality:1000%',
	`whywe_help` VARCHAR(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'We help to you select game. Low Cost and Quality',
	`aboutus_block1_mtext` VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Non User\'s are our users',
	`aboutus_block1_header` VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Welcome Back Non User',
	`aboutus_leftimage` VARCHAR(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'about_bg.png',
	`aboutus_rightimage` VARCHAR(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'about_images_1.png',
	`aboutus_block1_int` INT(11) NOT NULL DEFAULT '0',
	`aboutus_block1_text` VARCHAR(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Non Block 1',
	`aboutus_block2_int` INT(11) NOT NULL DEFAULT '0',
	`aboutus_block2_text` VARCHAR(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Non Block 2',
	`aboutus_block3_int` INT(11) NOT NULL DEFAULT '0',
	`aboutus_block3_text` VARCHAR(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Non Block 3',
	`aboutus_block4_int` INT(11) NOT NULL DEFAULT '0',
	`aboutus_block4_text` VARCHAR(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Non Block 4',
	`aboutus_block1_header2` VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Our effencivy',
	`aboutus_bottomblock1_header` VARCHAR(64) NOT NULL DEFAULT 'Header User\'s 1',
	`aboutus_bottomblock1_text` VARCHAR(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Hi User1',
	`aboutus_bottomblock2_header` VARCHAR(64) NOT NULL DEFAULT 'Header User\'s 2',
	`aboutus_bottomblock2_text` VARCHAR(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Hi User2',
	`aboutus_bottomblock3_header` VARCHAR(64) NOT NULL DEFAULT 'Header User\'s 3',
	`aboutus_bottomblock3_text` VARCHAR(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Hi User3',
	`aboutus_bottomblock4_header` VARCHAR(64) NOT NULL DEFAULT 'Header User\'s 4',
	`aboutus_bottomblock4_text` VARCHAR(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Hi User4',
	PRIMARY KEY (`id`)
) ENGINE=InnoDB;

/* All Games */
CREATE TABLE `AllGames` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`gameid` VARCHAR(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
	`image` VARCHAR(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
	`about` VARCHAR(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
	`ingamecurrency` VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
	`gameCoster` VARCHAR(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '{}',
	PRIMARY KEY (`id`)
) ENGINE=InnoDB;

/* Users */
CREATE TABLE `Users` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
	`password` VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB;