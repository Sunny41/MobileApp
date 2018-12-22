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
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(50) NOT NULL,
  `date` datetime NOT NULL,
  `place` varchar(50) NOT NULL,
  `activityAdminId` int(11) NOT NULL DEFAULT '0' COMMENT 'user who created the activity',
  PRIMARY KEY (`activityId`),
  KEY `activityAdminId` (`activityAdminId`),
  CONSTRAINT `activityAdminId` FOREIGN KEY (`activityAdminId`) REFERENCES `User` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table mobileapp.Activity: ~1 rows (approximately)
DELETE FROM `Activity`;
/*!40000 ALTER TABLE `Activity` DISABLE KEYS */;
INSERT INTO `Activity` (`activityId`, `name`, `description`, `date`, `place`, `activityAdminId`) VALUES
	(2, 'Clubnight', 'Party hard!', '2018-12-31 23:00:00', 'FlyHighClub', 2);
/*!40000 ALTER TABLE `Activity` ENABLE KEYS */;

-- Dumping structure for table mobileapp.ActivityMembers
CREATE TABLE IF NOT EXISTS `ActivityMembers` (
  `activityMembersActivityId` int(11) DEFAULT NULL COMMENT 'ID of the activity',
  `activityMembersUserId` int(11) DEFAULT NULL COMMENT 'ID of the participating user',
  KEY `activityMembersActivityId` (`activityMembersActivityId`),
  KEY `activityMembersUserId` (`activityMembersUserId`),
  CONSTRAINT `activityMembersActivityId` FOREIGN KEY (`activityMembersActivityId`) REFERENCES `Activity` (`activityId`),
  CONSTRAINT `activityMembersUserId` FOREIGN KEY (`activityMembersUserId`) REFERENCES `User` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='This table contains all the members participating in an activity';

-- Dumping data for table mobileapp.ActivityMembers: ~2 rows (approximately)
DELETE FROM `ActivityMembers`;
/*!40000 ALTER TABLE `ActivityMembers` DISABLE KEYS */;
INSERT INTO `ActivityMembers` (`activityMembersActivityId`, `activityMembersUserId`) VALUES
	(2, 1),
	(2, 2);
/*!40000 ALTER TABLE `ActivityMembers` ENABLE KEYS */;

-- Dumping structure for table mobileapp.Group
CREATE TABLE IF NOT EXISTS `Group` (
  `groupId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0',
  `description` varchar(50) NOT NULL DEFAULT '0',
  `groupAdminId` int(11) NOT NULL DEFAULT '0' COMMENT 'user who created the group',
  PRIMARY KEY (`groupId`),
  KEY `groupAdminId` (`groupAdminId`),
  CONSTRAINT `groupAdminId` FOREIGN KEY (`groupAdminId`) REFERENCES `User` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table mobileapp.Group: ~1 rows (approximately)
DELETE FROM `Group`;
/*!40000 ALTER TABLE `Group` DISABLE KEYS */;
INSERT INTO `Group` (`groupId`, `name`, `description`, `groupAdminId`) VALUES
	(1, 'Berlin Trip', 'Our trip to Berlin', 1);
/*!40000 ALTER TABLE `Group` ENABLE KEYS */;

-- Dumping structure for table mobileapp.GroupActivity
CREATE TABLE IF NOT EXISTS `GroupActivity` (
  `groupId` int(11) DEFAULT NULL,
  `activityId` int(11) DEFAULT NULL,
  KEY `GroupActivityGroupId` (`groupId`),
  KEY `GroupActivityActivityId` (`activityId`),
  CONSTRAINT `GroupActivityActivityId` FOREIGN KEY (`activityId`) REFERENCES `Activity` (`activityId`),
  CONSTRAINT `GroupActivityGroupId` FOREIGN KEY (`groupId`) REFERENCES `Group` (`groupId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='This table contains the activites of a group';

-- Dumping data for table mobileapp.GroupActivity: ~1 rows (approximately)
DELETE FROM `GroupActivity`;
/*!40000 ALTER TABLE `GroupActivity` DISABLE KEYS */;
INSERT INTO `GroupActivity` (`groupId`, `activityId`) VALUES
	(1, 2);
/*!40000 ALTER TABLE `GroupActivity` ENABLE KEYS */;

-- Dumping structure for table mobileapp.GroupMembers
CREATE TABLE IF NOT EXISTS `GroupMembers` (
  `groupId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  KEY `groupMembersGroupId` (`groupId`),
  KEY `groupMembersUserId` (`userId`),
  CONSTRAINT `groupMembersGroupId` FOREIGN KEY (`groupId`) REFERENCES `Group` (`groupId`),
  CONSTRAINT `groupMembersUserId` FOREIGN KEY (`userId`) REFERENCES `User` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='This table contains all the members of a group';

-- Dumping data for table mobileapp.GroupMembers: ~2 rows (approximately)
DELETE FROM `GroupMembers`;
/*!40000 ALTER TABLE `GroupMembers` DISABLE KEYS */;
INSERT INTO `GroupMembers` (`groupId`, `userId`) VALUES
	(1, 1),
	(1, 2);
/*!40000 ALTER TABLE `GroupMembers` ENABLE KEYS */;

-- Dumping structure for table mobileapp.Invitation
CREATE TABLE IF NOT EXISTS `Invitation` (
  `invitationId` int(11) NOT NULL AUTO_INCREMENT,
  `invitedUserId` int(11) NOT NULL DEFAULT '0' COMMENT 'ID of the user who is invited',
  `invitationFromUserId` int(11) NOT NULL DEFAULT '0' COMMENT 'ID of the user who sent the invitation',
  `invitationForGroupId` int(11) NOT NULL DEFAULT '0' COMMENT 'ID of the group the invitation was sent for',
  PRIMARY KEY (`invitationId`),
  KEY `invitedUserId` (`invitedUserId`),
  KEY `invitationFromUserId` (`invitationFromUserId`),
  KEY `invitationForGroupId` (`invitationForGroupId`),
  CONSTRAINT `invitationForGroupId` FOREIGN KEY (`invitationForGroupId`) REFERENCES `Group` (`groupId`),
  CONSTRAINT `invitationFromUserId` FOREIGN KEY (`invitationFromUserId`) REFERENCES `User` (`userId`),
  CONSTRAINT `invitedUserId` FOREIGN KEY (`invitedUserId`) REFERENCES `User` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table mobileapp.Invitation: ~0 rows (approximately)
DELETE FROM `Invitation`;
/*!40000 ALTER TABLE `Invitation` DISABLE KEYS */;
/*!40000 ALTER TABLE `Invitation` ENABLE KEYS */;

-- Dumping structure for table mobileapp.Item
CREATE TABLE IF NOT EXISTS `Item` (
  `itemId` int(11) NOT NULL AUTO_INCREMENT,
  `itemName` varchar(50) NOT NULL,
  `itemDescription` varchar(50) DEFAULT NULL COMMENT 'Further description for an item if necessary',
  `itemUserId` int(11) NOT NULL DEFAULT '0',
  `amount` double NOT NULL DEFAULT '0',
  `itemActivityId` int(11) NOT NULL DEFAULT '0' COMMENT 'ID of the activity the item belongs to',
  PRIMARY KEY (`itemId`),
  KEY `itemActivityId` (`itemActivityId`),
  KEY `itemUserId` (`itemUserId`),
  CONSTRAINT `itemActivityId` FOREIGN KEY (`itemActivityId`) REFERENCES `Activity` (`activityId`),
  CONSTRAINT `itemUserId` FOREIGN KEY (`itemUserId`) REFERENCES `User` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 COMMENT='This table will be used for normal queries - for invitations use itemInvited';

-- Dumping data for table mobileapp.Item: ~2 rows (approximately)
DELETE FROM `Item`;
/*!40000 ALTER TABLE `Item` DISABLE KEYS */;
INSERT INTO `Item` (`itemId`, `itemName`, `itemDescription`, `itemUserId`, `amount`, `itemActivityId`) VALUES
	(5, 'Fanta', NULL, 1, 2, 2),
	(8, 'Pizza Quattro Formaggi', NULL, 2, 6.5, 2);
/*!40000 ALTER TABLE `Item` ENABLE KEYS */;

-- Dumping structure for table mobileapp.ItemInvited
CREATE TABLE IF NOT EXISTS `ItemInvited` (
  `itemInvitedId` int(11) NOT NULL AUTO_INCREMENT,
  `itemName` varchar(50) NOT NULL DEFAULT '0',
  `itemDescription` varchar(50) NOT NULL DEFAULT '0',
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COMMENT='If someone takes an item for another person, this table will be used for queries';

-- Dumping data for table mobileapp.ItemInvited: ~1 rows (approximately)
DELETE FROM `ItemInvited`;
/*!40000 ALTER TABLE `ItemInvited` DISABLE KEYS */;
INSERT INTO `ItemInvited` (`itemInvitedId`, `itemName`, `itemDescription`, `amount`, `itemInviteActivityId`, `itemInviteUserId`, `itemInviteInvitedUserId`) VALUES
	(2, 'Pizza Funghi', '0', 7.5, 2, 2, 1);
/*!40000 ALTER TABLE `ItemInvited` ENABLE KEYS */;

-- Dumping structure for table mobileapp.User
CREATE TABLE IF NOT EXISTS `User` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `mail` varchar(50) NOT NULL DEFAULT '0',
  `username` varchar(50) NOT NULL DEFAULT '0' COMMENT 'display name',
  `password` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table mobileapp.User: ~2 rows (approximately)
DELETE FROM `User`;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` (`userId`, `mail`, `username`, `password`) VALUES
	(1, 'oliver.wagner@student.reutlingen-university.de', 'Oli', 'Hallo'),
	(2, 'peter.vogel@funfunfun.com', 'Peter', 'Pwd1212!');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
