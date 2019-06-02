CREATE TABLE IF NOT EXISTS user (
    user_id INT(11) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(75) NOT NULL,
    last_name VARCHAR(75) NOT NULL,
    username VARCHAR(75) NOT NULL unique key,
    hash CHAR(75) NOT NULL,
    salt CHAR(32) NOT NULL
);