# Host: localhost  (Version: 5.5.53)
# Date: 2018-03-20 11:29:00
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "web13"
#

DROP TABLE IF EXISTS `web13`;
CREATE TABLE `web13` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(12) DEFAULT NULL,
  `pass` varchar(20) DEFAULT NULL,
  `age` varchar(6) DEFAULT NULL,
  `tel` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

#
# Data for table "web13"
#

/*!40000 ALTER TABLE `web13` DISABLE KEYS */;
INSERT INTO `web13` VALUES (1,'nihao','123456','男','130');
/*!40000 ALTER TABLE `web13` ENABLE KEYS */;
