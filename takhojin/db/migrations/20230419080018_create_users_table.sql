-- migrate:up
CREATE TABLE users (
  id INT NOT NULL auto_increment PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(1000) NOT NULL ,
  description VARCHAR(1000) NULL,
  profie_img VARCHAR(2000) NULL ,
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp ON UPDATE current_timestamp
);
-- migrate:down
drop table users;