-- migrate:up
CREATE TABLE likes(
  id INT NOT NULL auto_increment PRIMARY KEY,
  users_id INT NOT NULL,
  posts_id INT NOT NULL,
  FOREIGN KEY (users_id) REFERENCES users(id),
  FOREIGN KEY (posts_id) REFERENCES posts(id)
);

-- migrate:down

