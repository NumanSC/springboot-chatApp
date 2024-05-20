CREATE TABLE IF NOT EXISTS `message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sender` varchar(255) DEFAULT NULL,
  `receiver` varchar(255) DEFAULT NULL,
  `message` text,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` enum(''JOIN'',''MESSAGE'',''LEAVE'') DEFAULT NULL,
  PRIMARY KEY (`id`)
) 