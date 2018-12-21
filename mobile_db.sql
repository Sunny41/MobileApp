-- --------------------------------------------------------
-- Host:                         cloudws1819.c0lwjxnry6gy.us-east-2.rds.amazonaws.com
-- Server version:               5.6.41-log - Source distribution
-- Server OS:                    Linux
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for mobileapp
CREATE DATABASE IF NOT EXISTS `mobileapp` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `mobileapp`;

-- Dumping structure for table mobileapp.Activity
CREATE TABLE IF NOT EXISTS `Activity` (
  `activityId` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(50) NOT NULL,
  `date` datetime NOT NULL,
  `place` varchar(50) NOT NULL,
  `activityAdminId` int(11) NOT NULL DEFAULT '0' COMMENT 'user who created the activity',
  PRIMARY KEY (`activityId`),
  KEY `activityAdminId` (`activityAdminId`),
  CONSTRAINT `activityAdminId` FOREIGN KEY (`activityAdminId`) REFERENCES `User` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table mobileapp.ActivityMembers
CREATE TABLE IF NOT EXISTS `ActivityMembers` (
  `activityMembersActivityId` int(11) DEFAULT NULL COMMENT 'ID of the activity',
  `activityMembersUserId` int(11) DEFAULT NULL COMMENT 'ID of the participating user',
  KEY `activityMembersActivityId` (`activityMembersActivityId`),
  KEY `activityMembersUserId` (`activityMembersUserId`),
  CONSTRAINT `activityMembersActivityId` FOREIGN KEY (`activityMembersActivityId`) REFERENCES `Activity` (`activityId`),
  CONSTRAINT `activityMembersUserId` FOREIGN KEY (`activityMembersUserId`) REFERENCES `User` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='This table contains all the members participating in an activity';

-- Data exporting was unselected.
-- Dumping structure for table mobileapp.Group
CREATE TABLE IF NOT EXISTS `Group` (
  `groupId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0',
  `description` varchar(50) NOT NULL DEFAULT '0',
  `groupAdminId` int(11) NOT NULL DEFAULT '0' COMMENT 'user who created the group',
  PRIMARY KEY (`groupId`),
  KEY `groupAdminId` (`groupAdminId`),
  CONSTRAINT `groupAdminId` FOREIGN KEY (`groupAdminId`) REFERENCES `User` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table mobileapp.GroupActivity
CREATE TABLE IF NOT EXISTS `GroupActivity` (
  `groupId` int(11) DEFAULT NULL,
  `activityId` int(11) DEFAULT NULL,
  KEY `GroupActivityGroupId` (`groupId`),
  KEY `GroupActivityActivityId` (`activityId`),
  CONSTRAINT `GroupActivityActivityId` FOREIGN KEY (`activityId`) REFERENCES `Activity` (`activityId`),
  CONSTRAINT `GroupActivityGroupId` FOREIGN KEY (`groupId`) REFERENCES `Group` (`groupId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='This table contains the activites of a group';

-- Data exporting was unselected.
-- Dumping structure for table mobileapp.GroupMembers
CREATE TABLE IF NOT EXISTS `GroupMembers` (
  `groupId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  KEY `groupMembersGroupId` (`groupId`),
  KEY `groupMembersUserId` (`userId`),
  CONSTRAINT `groupMembersGroupId` FOREIGN KEY (`groupId`) REFERENCES `Group` (`groupId`),
  CONSTRAINT `groupMembersUserId` FOREIGN KEY (`userId`) REFERENCES `User` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='This table contains all the members of a group';

-- Data exporting was unselected.
-- Dumping structure for table mobileapp.Item
CREATE TABLE IF NOT EXISTS `Item` (
  `itemId` int(11) NOT NULL AUTO_INCREMENT,
  `itemUserId` int(11) NOT NULL DEFAULT '0',
  `amount` double NOT NULL DEFAULT '0',
  `itemActivityId` int(11) NOT NULL DEFAULT '0' COMMENT 'ID of the activity the item belongs to',
  PRIMARY KEY (`itemId`),
  KEY `itemActivityId` (`itemActivityId`),
  CONSTRAINT `itemActivityId` FOREIGN KEY (`itemActivityId`) REFERENCES `Activity` (`activityId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='This table will be used for normal queries - for invitations use itemInvited';

-- Data exporting was unselected.
-- Dumping structure for table mobileapp.itemInvited
CREATE TABLE IF NOT EXISTS `itemInvited` (
  `itemInvitedId` int(11) NOT NULL AUTO_INCREMENT,
  `amount` double NOT NULL DEFAULT '0',
  `itemInviteActivityId` int(11) NOT NULL DEFAULT '0' COMMENT 'ID of the activity the item belongs to',
  `itemInviteUserId` int(11) NOT NULL DEFAULT '0' COMMENT 'the user who''s inviting another person',
  `itemInviteInvitedUserId` int(11) NOT NULL DEFAULT '0' COMMENT 'the user who''s got invited by another person',
  PRIMARY KEY (`itemInvitedId`),
  KEY `itemInviteUserId` (`itemInviteUserId`),
  KEY `itemInviteInvitedUserId` (`itemInviteInvitedUserId`),
  KEY `itemInviteActivityId` (`itemInviteActivityId`),
  CONSTRAINT `itemInviteActivityId` FOREIGN KEY (`itemInviteActivityId`) REFERENCES `Activity` (`activityId`),
  CONSTRAINT `itemInviteInvitedUserId` FOREIGN KEY (`itemInviteInvitedUserId`) REFERENCES `User` (`userId`),
  CONSTRAINT `itemInviteUserId` FOREIGN KEY (`itemInviteUserId`) REFERENCES `User` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='If someone takes an item for another person, this table will be used for queries';

-- Data exporting was unselected.
-- Dumping structure for table mobileapp.User
CREATE TABLE IF NOT EXISTS `User` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `mail` varchar(50) NOT NULL DEFAULT '0',
  `username` varchar(50) NOT NULL DEFAULT '0' COMMENT 'display name',
  `password` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
