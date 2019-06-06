CREATE TABLE user (
  userId int(11) unsigned NOT NULL AUTO_INCREMENT,
  firstName varchar(75) NOT NULL,
  lastName varchar(75) NOT NULL,
  username varchar(75) NOT NULL,
  hash char(75) NOT NULL,
  salt char(32) NOT NULL,
  PRIMARY KEY (userId),
  UNIQUE KEY (username)
);

CREATE TABLE client (
  clientId smallint(11) unsigned NOT NULL AUTO_INCREMENT,
  secret char(32) NOT NULL,
  name varchar(50) NOT NULL,
  PRIMARY KEY (clientId)
);

create table level (
    levelId smallint(11) unsigned NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY(levelId)
);

create table userLevel (
    userId int(11) unsigned NOT NULL,
    levelId smallint(11) unsigned NOT NULL,
    FOREIGN KEY (userId) REFERENCES user(userId) ON DELETE CASCADE
);

CREATE TABLE userClient (
  userId int(11) unsigned NOT NULL,
  clientId smallint(11) DEFAULT NULL,
  FOREIGN KEY (userId) REFERENCES user(userId) ON DELETE CASCADE
);

CREATE TABLE userToken (
  tokenId char(32) NOT NULL,
  userId int(11) unsigned NOT NULL,
  token varchar(1000) DEFAULT NULL,
  valid tinyint(1) DEFAULT 1,
  FOREIGN KEY (userId) REFERENCES user(userId) ON DELETE CASCADE
);