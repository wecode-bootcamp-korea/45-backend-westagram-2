-- migrate:up
ALTER TABLE posts ADD imageUrl VARCHAR(2000) NOT NULL AFTER content;
-- migrate:down
