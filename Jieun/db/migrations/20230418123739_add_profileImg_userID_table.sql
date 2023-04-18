-- migrate:up
ALTER TABLE users ADD profileImage INT NOT NULL AFTER name;
ALTER TABLE posts ADD user_id INT NOT NULL AFTER id;
-- migrate:down
ALTER TABLE users DROP profileImage;
ALTER TABLE posts DROP user_id;
