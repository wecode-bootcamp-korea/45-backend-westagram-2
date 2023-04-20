-- migrate:up
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email   VARCHAR(200) NOT NULL UNIQUE,
    phone_number VARCHAR(200) NOT NULL UNIQUE,
    age INT NOT NULL,
    user_name VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
)

-- migrate:down
DROP TABLE users;
