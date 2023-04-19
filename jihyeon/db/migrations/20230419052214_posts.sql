-- migrate:up
CREATE TABLE posts (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    post_content VARCHAR(2000) NOT NULL,
    post_image VARCHAR(2000) NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NULL ON UPDATE current_timestamp,
    FOREIGN KEY (user_id) REFERENCES users (id)
    )

-- migrate:down
DROP TABLE posts;
