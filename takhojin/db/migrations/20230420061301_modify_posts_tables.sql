-- migrate:up
ALTER TABLE posts ADD user_id INT NOT NULL;
ALTER TABLE posts ADD FOREIGN KEY (user_id) REFERENCES users (id);

-- migrate:down

