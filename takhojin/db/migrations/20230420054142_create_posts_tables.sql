-- migrate:up
CREATE TABLE posts(
  id INT NOT null AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(1000) NOT NULL ,
  description TEXT NOT NULL,
  image VARCHAR(1000)  NULL,
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp ON UPDATE current_timestamp
);

-- migrate:down
DROP TABLE posts;
