-- migrate:up
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    phone_number VARCHAR(200) NOT NULL
    )

-- migrate:down
DROP TABLE users;
