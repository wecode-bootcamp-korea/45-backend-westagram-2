-- migrate:up
ALTER TABLE users CHANGE profileImage profile_image VARCHAR(2000);
ALTER TABLE users CHANGE phoneNumber phone_number VARCHAR(100);
ALTER TABLE posts CHANGE imageUrl image_url VARCHAR(2000);

-- migrate:down
ALTER TABLE users CHANGE profile_image profileImage VARCHAR(2000);
ALTER TABLE users CHANGE phone_number phoneNumber VARCHAR(100);
ALTER TABLE posts CHANGE image_url imageUrl VARCHAR(2000);