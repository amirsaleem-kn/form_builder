
CREATE TABLE user (
  user_id int(11) unsigned NOT NULL AUTO_INCREMENT,
  first_name varchar(75) NOT NULL,
  last_name varchar(75) NOT NULL,
  username varchar(75) NOT NULL,
  hash char(75) NOT NULL,
  salt char(32) NOT NULL,
  PRIMARY KEY (user_id),
  UNIQUE KEY (username)
);

CREATE TABLE client (
  client_id smallint(11) unsigned NOT NULL AUTO_INCREMENT,
  secret char(32) NOT NULL,
  name varchar(50) NOT NULL,
  PRIMARY KEY (client_id)
);

create table level (
    level_id smallint(11) unsigned NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY(level_id)
);

create table user_level (
    user_id int(11) unsigned NOT NULL,
    level_id smallint(11) unsigned NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

CREATE TABLE user_client (
  user_id int(11) unsigned NOT NULL,
  client_id smallint(11) DEFAULT NULL,
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

CREATE TABLE user_access_token (
  token_id char(32) NOT NULL,
  user_id int(11) unsigned NOT NULL,
  token varchar(1000) DEFAULT NULL,
  valid tinyint(1) DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

CREATE TABLE user_refresh_token (

)