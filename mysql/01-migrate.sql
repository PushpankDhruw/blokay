
SET NAMES utf8mb4;


# Dump of table _query_executions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `_query_executions`;

CREATE TABLE `_query_executions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `sql` text,
  `ms` int(10) unsigned DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table businesses
# ------------------------------------------------------------

DROP TABLE IF EXISTS `businesses`;

CREATE TABLE `businesses` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `website` varchar(100) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `ownerId` int(11) unsigned DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table datasources
# ------------------------------------------------------------

DROP TABLE IF EXISTS `datasources`;

CREATE TABLE `datasources` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `businessId` int(11) unsigned DEFAULT NULL,
  `config` text,
  `structure` longtext,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table neuron_groups
# ------------------------------------------------------------

DROP TABLE IF EXISTS `neuron_groups`;

CREATE TABLE `neuron_groups` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table neurons
# ------------------------------------------------------------

DROP TABLE IF EXISTS `neurons`;

CREATE TABLE `neurons` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `parentId` int(11) unsigned DEFAULT NULL,
  `executions` int(11) unsigned DEFAULT '0',
  `timeMs` int(20) unsigned DEFAULT '0',
  `key` varchar(100) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `rolPrivilegeId` int(11) unsigned DEFAULT NULL,
  `filters` text,
  `synapse` text,
  `executable` text,
  `history` longtext,
  `businessId` int(11) unsigned DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table sessions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sessions`;

CREATE TABLE `sessions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `withExpiration` tinyint(4) DEFAULT '1',
  `userId` int(10) unsigned DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `ipAddress` int(10) unsigned DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `lastActivity` datetime DEFAULT NULL,
  `deviceId` char(36) DEFAULT NULL,
  `geoAccuracy` decimal(10,6) unsigned DEFAULT NULL,
  `geoLat` decimal(10,8) DEFAULT NULL,
  `geoLon` decimal(11,8) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `token` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table user_permissions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_permissions`;

CREATE TABLE `user_permissions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `viewId` int(11) unsigned DEFAULT NULL,
  `userId` int(11) unsigned DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `cellphone` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `mfa` text,
  `businessId` int(11) unsigned DEFAULT NULL,
  `rol` varchar(100) DEFAULT NULL,
  `blockedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table view_groups
# ------------------------------------------------------------

DROP TABLE IF EXISTS `view_groups`;

CREATE TABLE `view_groups` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `businessId` int(11) unsigned DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table views
# ------------------------------------------------------------

DROP TABLE IF EXISTS `views`;

CREATE TABLE `views` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `icon` varchar(100) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `layout` text,
  `businessId` int(11) unsigned DEFAULT NULL,
  `viewGroupId` int(11) unsigned DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

