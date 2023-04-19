-- migrate:up
ALTER TABLE users MODIFY profileImage VARCHAR(2000) NOT NULL AFTER name;

-- migrate:down
ALTER TABLE users MODIFY profileImage INT NOT NULL AFTER name;
